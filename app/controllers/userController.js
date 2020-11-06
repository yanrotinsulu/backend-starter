const model = require('../data/models/index');
const hashHelper = require('../helpers/hashes');

const getFieldsToUpdate = (fields) => {
    return {
      ...fields.username && { username: fields.username },
      ...fields.email && { email: fields.email },
      ...fields.fullname && { full_name: fields.fullname },
      ...fields.password && { password: fields.password }
    }
};  

// Display list of all Users.
exports.user_list = async function(req, res) {
    try {
        const listOfUser = await model.user.findAll({});
        if (listOfUser.length !== 0) {
          res.json({
            'status': 'OK',
            'messages': '',
            'data': listOfUser
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
        fieldsToAdd.password = await hashHelper.hashASync(fieldsToAdd.password);
        fieldsToAdd.is_activated = true;
        fieldsToAdd.is_locked = false;
        fieldsToAdd.created_by = "system";
        fieldsToAdd.updated_by = "system";
        
        const addedUser = await model.user.create(fieldsToAdd);
        if (addedUser) {
          res.status(201).json({
            'status': 'OK',
            'messages': 'New user successfully be added',
            'data': addedUser,
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
        const userId = req.params.id;
        const deletedUser = await model.user.destroy({
          where: {
            id: userId
          }
        })
        if (deletedUser) {
          res.json({
            'status': 'OK',
            'messages': 'User successfully be deleted',
            'data': deletedUser,
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
        const userId = req.params.id;
        const fieldsToUpdate = getFieldsToUpdate(req.body);

        fieldsToUpdate.updated_by = "system";
        if("password" in fieldsToUpdate){
          fieldsToUpdate.password = await hashHelper.hashASync(fieldsToUpdate.password);
        }
    
        const updatedUser = await model.user.update(fieldsToUpdate, {
          where: {
            id: userId
          }
        });
    
        if (updatedUser) {
          res.json({
            'status': 'OK',
            'messages': 'User successfully be updated',
            'data': updatedUser,
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