module.exports = {
    createAttribute: function (req, res) {
        var sent_attribute = req.allParams();
        var standardize_name = sent_attribute.name.toLowerCase()
        sent_attribute.name = standardize_name;

        Attribute.find(sent_attribute.name).exec(function (err, attribute_record) {
            if (err) {
                return res.serverError(err);
            }
            console.log(attribute_record.name + "'s id is", attribute_record.id);
            if (attribute_record.length < 1){
            Attribute.create(sent_attribute).exec(function (err, created_attribute) {
                    if (err) { return res.serverError(err); }
                    console.log(created_attribute.name + "'s id is", created_attribute.id);
                    return res.ok();
                });
                return res.ok();
            }
            return res.json({
                "error": "record already exists"
            });
        });

    },
}