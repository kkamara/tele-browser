import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTrashAlt, 
    faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';

import API_ROUTES from '../api-routes';
import EditItem from './EditItem';
import DelItem from './DelItem';

/** @const {func} Items */
const Items = ({ 
    items, 
    setItems, 
    broadcastChannel, 
}) => {
    const [editItemModalOpen, setEditItemModalOpen] = useState(false);
    const [delItemModalOpen, setDelItemModalOpen] = useState(false);
    const [deleteChoice, setDeleteChoice] = useState("n");
    const [itemEditing, setItemEditing] = useState(null);
    const [itemDeleting, setItemDeleting] = useState(null);

    /** 
    * @const {func} setItemEditingName 
    * @param {string} name
    */
    const setItemEditingName = name => {
        setItemEditing({
            name,
            name_slug: itemEditing.name_slug,
        });
    }

    /** 
    * @const {func} handleDeleteItem 
    * @param {item} item
    */
    const handleDeleteItem = item => {
        setItemDeleting(item);
        setDelItemModalOpen(true);
    }

    /** 
    * @const {func} handleEditItem 
    * @param {item} item
    */
    const handleEditItem = item => {
        setEditItemModalOpen(true);
        setItemEditing(item);
    }

    /** 
     * @async
     * @const {func} handleEditSubmit 
     */
    const handleEditSubmit = async () => {
        const { name, name_slug } = itemEditing;
        try {
            const res = await axios.patch(
                `${API_ROUTES.ITEM.ROOT}${API_ROUTES.ITEM.UPDATE.replace(':slug', name_slug)}`,
                { name }
            );
            setItems(data => {                
                for(const key in data) {
                    if (name_slug === data[key].name_slug) {
                        data[key].name_slug = res.data.name_slug;
                        data[key].name = res.data.name;
                    }
                }

                return [ ...data ];
            });
            setEditItemModalOpen(false);
            setItemEditing(null);
        } catch (err) {
            console.log(err);
            alert(JSON.stringify(err.response.data));
            setEditItemModalOpen(false);
            setItemEditing(null);
            return;
        }
    }

    /** 
     * @async
     * @const {func} handleDelSubmit 
     */
    const handleDelSubmit = async () => {
        if (deleteChoice !== "y") {
            setItemDeleting(null);
            setDelItemModalOpen(false);
            return;
        }

        const { name_slug } = itemDeleting;
        try {
            const res = await axios.delete(
                `${API_ROUTES.ITEM.ROOT}${API_ROUTES.ITEM.DELETE.replace(':slug', name_slug)}`
            );
            if (res.status !== 200) {
                alert(JSON.stringify(res.data));
                setEditItemModalOpen(false);
                setItemEditing(null);
                return;
            }
            setItems(data => data.filter(({ name_slug: slug }) => {
                if (name_slug === slug) {
                    return false;
                }
                return true;
            }));
            setItemDeleting(null);
            setDelItemModalOpen(false);
        } catch (err) {
            console.log(err);
            alert(JSON.stringify(err.response.data));
            setEditItemModalOpen(false);
            setItemEditing(null);
            return;
        }
    }

    /** @const {func} handleEditModalClose */
    const handleEditModalClose = () => {
        setEditItemModalOpen(false);
        setItemEditing(null);
    }

    /** @const {func} handleDeleteModalClose */
    const handleDeleteModalClose = () => {
        setEditItemModalOpen(false);
        setDelItemModalOpen(null);
        setDeleteChoice("n");
    }
    
    return (
        <div id="item-container" className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            {items.map(({name, name_slug}) => (
                    <div key={name_slug} className="p-8">
                        <div 
                            className="uppercase tracking-wide text-sm text-indigo-500 font-semibold grid grid-cols-10"
                        >
                            <div className="col-span-9">{name}</div>
                            <div className="col-end">
                                <button>
                                    <FontAwesomeIcon 
                                        size="2x" 
                                        className="trash-alt-icon" 
                                        icon={faTrashAlt} 
                                        onClick={() => handleDeleteItem({name, name_slug})}
                                    />
                                </button>
                                <button className="ml-2">
                                    <FontAwesomeIcon 
                                        size="2x" 
                                        className="pencil-alt-icon" 
                                        icon={faPencilAlt} 
                                        onClick={() => handleEditItem({name, name_slug})}
                                    />
                                </button>
                            </div>
                        </div>
                </div>
            ))}
            <EditItem 
                editItemModalOpen={editItemModalOpen}
                handleEditModalClose={handleEditModalClose}
                itemEditing={itemEditing}
                setItemEditingName={setItemEditingName}
                handleEditSubmit={handleEditSubmit}
            />
            <DelItem
                delItemModalOpen={delItemModalOpen}
                handleDeleteModalClose={handleDeleteModalClose}
                itemDeleting={itemDeleting}
                broadcastChannel={broadcastChannel}
                handleDelSubmit={handleDelSubmit}
                deleteChoice={deleteChoice}
                setDeleteChoice={setDeleteChoice}
            />
        </div>
    );
};

export default Items;
