import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import './index.css';

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [newRecord, setNewRecord] = useState({
    item: '',
    class: '',
    description: '',
    containment: '',
    imageFile: null, 
  });

  const [editRecord, setEditRecord] = useState(null);

// fetches items on component mount
  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('scp').select('*');
      if (error) {
        console.error('Error fetching items:', error.message);
      } else {
        setItems(data);
      }
    };
    fetchItems();
  }, []);

  // helps in adding new item
  const addItem = async () => {
    if (!newRecord.imageFile) {
      console.error('Please select an image file to upload.');
      return;
    }
     //helps in inserting new item with uploaded image url
    const uploadedImageUrl = await uploadImage(newRecord.imageFile);
    if (!uploadedImageUrl) {
      console.error('Failed to upload image.');
      return;
    }

    const { data, error } = await supabase
      .from('scp')
      .insert([{ ...newRecord, imageFile: uploadedImageUrl }]);

    if (error) {
      console.error('Error adding item:', error.message);
    } else if (data && data.length > 0) {
      setNewRecord({ item: '', class: '', description: '', containment: '', imageFile: null });
      setItems((prevItems) => [...prevItems, data[0]]);
      window.location.reload();
    } else {
      console.error('No data returned from insert operation.');
      window.location.reload();
    }
  };
// to delete item
  const deleteItem = async (id) => {
    const { error } = await supabase.from('scp').delete().eq('id', id);
    if (error) {
      console.error('Error deleting item:', error.message);
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // to edit item
  const startEditing = (item) => {
    setEditRecord(item);
  };

  const saveEdit = async (id) => {
    const { error } = await supabase.from('scp').update(editRecord).eq('id', id);
    if (error) {
      console.error('Error saving edit:', error.message);
    } else {
      setEditRecord(null);
      setItems((prev) => prev.map((item) => (item.id === id ? editRecord : item)));
    }
  };

  const handleImageChange = (event) => {
    setNewRecord({ ...newRecord, imageFile: event.target.files[0] });
  };

  // function to upload image to supabase storage
  const uploadImage = async (imageFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('image') 
        .upload(imageFile.name, imageFile);

      if (error) {
        console.error('Error uploading image:', error.message);
        return null;
      }

      const publicUrl = await supabase.storage
        .from('image')
        .getPublicUrl(data.path);

      return publicUrl.data.publicUrl;
    } catch (error) {
      console.error('Error in image upload:', error.message);
      return null;
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editRecord && editRecord.id === item.id ? (
              <div>
                <input value={editRecord.item} onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })} />
                <input value={editRecord.class} onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })} />
                <input value={editRecord.description} onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })} />
                <input value={editRecord.containment} onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })} />
                <input type="file" onChange={handleImageChange} />
                <button onClick={() => saveEdit(item.id)}>Save</button>
                <button onClick={() => setEditRecord(null)}>Cancel</button>
              </div>
            ) : (
              <div className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{item.item}</h5>
                  <p className="card-text">
                    <button onClick={() => startEditing(item)} className='btn btn-success'>Edit</button>
                    <button onClick={() => deleteItem(item.id)} className='btn btn-danger'>Delete</button>
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <input 
        value={newRecord.item} 
        onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })} 
      />
      <input 
        value={newRecord.class} 
        onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })} 
      />
      <input 
        value={newRecord.description} 
        onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} 
      />
      <input 
        value={newRecord.containment} 
        onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })} 
      />
      <input type='file' onChange={handleImageChange} />
      <button onClick={addItem} className='btn btn-success'>Add Item</button>
    </div>
  );
}

export default AdminPanel;