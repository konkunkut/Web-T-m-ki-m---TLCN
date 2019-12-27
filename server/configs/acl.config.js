const Acl = require('acl');
const{ Aclclass} = require('../helper/acl_store.heiper');
const MongodbBackend = Acl.mongodbBackend;
function acl_config(dbconnect){
    const aclBackend = new MongodbBackend(dbconnect,'_acl');
    const ACL = new Acl(aclBackend);
    ACL.allow([
        {
            roles:'user',
            allows:[

            ],
            roles: 'admin',
            allows: [
                
            ],
            roles: 'editor',
            allows: [
                {
                    resources:'/News/createNewsbyUser',
                    permissions:'post'
                },
                {
                    resources:'/News/deleteNews',
                    permissions:'delete'
                },
                {
                    resources:'/News/editNews',
                    permissions:'put'
                }
            ]
        }
    ]);
    Aclclass.setAcl = ACL
}
module.exports ={acl_config:acl_config};