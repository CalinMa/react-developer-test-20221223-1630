import React from 'react';
import CustomTable from "../../CustomTable";

function UsersList({data, sortUsersList}) {

    const tableHeader = {type: 'User ID'}

    return (
        <CustomTable data={data} sortList={sortUsersList} tableHeader={tableHeader}/>
    )
}
export default  UsersList;
