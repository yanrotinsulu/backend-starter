import modelIndex from '../data/models/index.js';
const model = modelIndex;

import hashes from '../helpers/hashes.js';
const hashHelper = hashes;

const getFormFields = (fields) => {
    return {
      ...fields.username && { username: fields.username },
      ...fields.email && { email: fields.email },
      ...fields.fullname && { full_name: fields.fullname },
      ...fields.password && { password: fields.password }
    }
};  

const controller = {}

// Display list of all Users.
controller.user_list = async function(req, res) {
    try {
        const users = await model.user.findAll({});
        if (users.length !== 0) {
          res.json({
            'status': 'OK',
            'messages': '',
            'data': users
          })
        } else {
          res.json({
            'status': 'ERROR',
            'messages': 'No user records found',
            'data': {}
          })
        }
    } catch (err) {
        res.json({
          'status': 'ERROR',
          'messages': err.messages,
          'data': {}
        })
    }
};

// Display detail page for a specific User.
controller.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Display User create form on GET.
controller.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User create on POST.
controller.user_create_post = async function(req, res) {
    try {
        const formFields = getFormFields(req.body);
        formFields.password = await hashHelper.hashASync(formFields.password);
        formFields.is_activated = true;
        formFields.is_locked = false;
        formFields.created_by = "system";
        formFields.updated_by = "system";
        
        const userAdded = await model.user.create(fieldsToAdd);
        if (userAdded) {
          res.status(201).json({
            'status': 'OK',
            'messages': 'New user successfully be added',
            'data': userAdded,
          })
        }
    } catch (err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message,
          'data': {},
        })
    }
};

// Display User delete form on GET.
controller.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
controller.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Handle User delete on POST.
controller.user_delete_delete = async function(req, res) {
    try {
        const userId = req.params.id;
        const userDeleted = await model.user.destroy({
          where: {
            id: userId
          }
        })
        if (userDeleted) {
          res.json({
            'status': 'OK',
            'messages': 'User successfully be deleted',
            'data': userDeleted,
          })
        }
    } catch (err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message,
          'data': {},
        })
    }
};

// Display User update form on GET.
controller.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
controller.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};

// Handle User update on PATCH.
controller.user_update_patch = async function(req, res) {
    try {
        const userId = req.params.id;
        const formFields = getFormFields(req.body);

        formFields.updated_by = "system";
        if("password" in formFields){
          formFields.password = await hashHelper.hashASync(formFields.password);
        }
    
        const userUpdated = await model.user.update(formFields, {
          where: {
            id: userId
          }
        });
    
        if (userUpdated) {
          res.json({
            'status': 'OK',
            'messages': 'User successfully be updated',
            'data': userUpdated,
          })
        }
    } catch (err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message,
          'data': {},
        })
    }
};

export default controller;