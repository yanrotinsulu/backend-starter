const model = require('../data/models/index');
const authService = require('../helpers/hashes');

//const User = require('../data/models/users');

const getFieldsToUpdate = (fields) => {
    return {
      ...fields.email && { email: fields.email },
      ...fields.fullname && { userFullName: fields.fullname },
      ...fields.password && { password: fields.password }
    }
};  

// Display list of all Users.
exports.user_list = async function(req, res) {
    try {
        const users = await model.users.findAll({});
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
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User create on POST.
exports.user_create_post = async function(req, res) {
    try {
        const fieldsToAdd = getFieldsToUpdate(req.body);
        fieldsToAdd.password = await authService.hashASync(fieldsToAdd.password);
        fieldsToAdd.isActivated = true;
        fieldsToAdd.isLocked = false;
        fieldsToAdd.createdBy = "system";
        fieldsToAdd.updatedBy = "system";
        
        const users = await model.users.create(fieldsToAdd);
        if (users) {
          res.status(201).json({
            'status': 'OK',
            'messages': 'New user successfully be added',
            'data': users,
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
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Handle User delete on POST.
exports.user_delete_delete = async function(req, res) {
    try {
        const usersId = req.params.id;
        const users = await model.users.destroy({
          where: {
            id: usersId
          }
        })
        if (users) {
          res.json({
            'status': 'OK',
            'messages': 'User successfully be deleted',
            'data': users,
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
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};

// Handle User update on PATCH.
exports.user_update_patch = async function(req, res) {
    try {
        const usersId = req.params.id;
        const fieldsToUpdate = getFieldsToUpdate(req.body);

        fieldsToUpdate.updatedBy = "system";
        if("password" in fieldsToUpdate){
          fieldsToUpdate.password = await authService.hashASync(fieldsToUpdate.password);
        }
    
        const users = await model.users.update(fieldsToUpdate, {
          where: {
            id: usersId
          }
        });
    
        if (users) {
          res.json({
            'status': 'OK',
            'messages': 'User successfully be updated',
            'data': users,
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