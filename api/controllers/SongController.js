/**
 * AccountTrackingController
 *
 * @description :: Server-side logic for managing patient accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


// var uuid = require("node-uuid");



module.exports =
    {
        getSongs: function(req, res){
            SongService.doAuth(req, res).then(function());
        },
        saveTransaction: function (req, res) {
            
            var patientPK = req.body.transaction.patientPK;
            
            var update = { $push: {}, $set: {}}
            payment = req.body.transaction;
            payment['PMTPK'] = uuid.v4();
            update['$push']['PMT'] = req.body.transaction;
            update['$set']['CHARGE'] = req.body.charges;



            Patient.native(function (err, PatientCollection) {
                PatientCollection.update(
                    { _id: patientPK },
                    update,
                    function (err, rows) {
                        console.log(err);
                        return res.send("Done!");
                    }
                );
            });
            


        },
        findBalance: function (req, res) {
            var patientPK = req.body.patientPK;
            Patient.find({ id: patientPK })
                .exec(function (err, patient) {
                    if (err) {
                        return res.json(err);
                    }
                    var patientCharges

                    return res.json(patient);
                });
        }
    }

