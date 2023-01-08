import React from 'react';
import CustomTable from "../../CustomTable";

function ProjectsList({data, sortProjectsList}) {
    const tableHeader = {type: 'Project ID'}
    return (
       <CustomTable data={data} sortList={sortProjectsList} tableHeader={tableHeader}/>
    )
}
export default  ProjectsList;
