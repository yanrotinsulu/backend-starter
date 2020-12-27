const access_control = require('../helpers/accesscontrol');

// Display list of all Users.
exports.check_role = async function(req, res) {
    try {
        let data_sample = [{
            id : 1,
            name: "test",
            title: "judul"
        }];
        const permission = access_control.can('admin').updateAny('video');
        if(permission.granted){
            res.json({
                'status': 'OK',
                'messages': '',
                'data': permission.filter(data_sample)
            })
        }
        else {
            res.json({
                'status': 'Not Granted Permission',
                'messages': '',
                'data': {}
            })
        }
    } catch (err) {
        res.json({
          'status': 'ERROR',
          'messages': err.messages || err.message,
          'data': {}
        })
    }
};