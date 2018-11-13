
var oracledb = require('oracledb');

// Get a non-pooled connection
oracledb.getConnection(
    {
        user: 'comnet',
        password: 'combrain',
        //connectString: '182.150.52.133:1521/combrain'
        connectString: '119.23.61.241:1521/combrain'
    },
    function (err, connection)
    {
        if (err)
        {
            console.error(err.message);
            return;
        }
        connection.execute('select * from shengyiyuan_itemdoc where rownum < 10', [], function (err, result)
        {
            if (err)
            {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.metaData);
            console.log(JSON.stringify(result.rows.map((v)=>
            {
                return result.metaData.reduce((p, key, i)=>
                {
                    p[key.name] = v[i];
                    return p;
                }, {})
            })));
            doRelease(connection);
        });
    });

function doRelease(connection)
{
    connection.close(console.info);
}