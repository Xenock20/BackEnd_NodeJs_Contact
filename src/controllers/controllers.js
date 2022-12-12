import { conect } from "../db.js";

export const getContacts = (req, res) => {
    conect.query('SELECT * FROM contacto', (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    )
}

export const getContact = (req, res) => {
    const {id} = req.params;
    conect.query(
        'SELECT * FROM contacto WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            if(result.length > 0) {
                res.send(result);
            } else { 
                res.status(404).json({message: "Not Found"});
            }
        }
    )
}

export const addContact = (req, res) => {
    const {name, surname, num} = req.body
    conect.query('INSERT INTO contacto (`name`, `surname`, `num`) VALUE (?, ?, ?)', [name, surname, num], (err) => {
        if (err) throw err;
        res.send("Added contact");
    })
}

export const updateContact = (req, res) => {
    const {id} = req.params;
    const {name, surname, num} = req.body
    conect.query('UPDATE contacto SET `name` = ?, `surname` = ?, `num` = ? WHERE id = ?', [name, surname, num, id], (err) => {
        if (err) throw err;
        res.send("Update contact");
    })
}

export const deleteContact = (req, res) => {
    const {id} = req.params;
    conect.query('DELETE FROM contacto WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.send("Delete contact");
    })
}