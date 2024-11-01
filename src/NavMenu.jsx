import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { supabase } from './supabase';

function NavMenu() {
    // stores the list of items from database
    const [items, setItems] = useState([]); 
    

    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('scp').select('id, item');// Only selects ID and item name 
            if (error) {
                console.error(error);
            } else {
                setItems(data);
            }
        };

        fetchItems();
    }, []);

    return(
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {items.map(item=>(
            <Nav className="me-auto" key={item.id}>
                    <Nav.Link href={`/item/${item.id}`}>{item.item}</Nav.Link>
                    </Nav>
                ))}
                <Nav>
                    <Nav.Link href={`/admin`}>Admin Panel</Nav.Link> 
                </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}
export default NavMenu;