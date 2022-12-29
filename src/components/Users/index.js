import React from 'react';
import List from './List'
import api from "../../lib/api";
import {Button, CircularProgress} from "@material-ui/core";

class Users extends React.Component {

    state = {
        usersList: null,
        isLoading: true,
        error: null,
        sortDirection: 'desc',
        noMoreData: false
    }

     sortUsersList = async (sortDirection) => {

         if (sortDirection === 'desc') {

             const sortedUsersList = await this.state.usersList.sort(function (x, y) {
                 return y.timestamp - x.timestamp;
             })
              this.setState({usersList: sortedUsersList, sortDirection: 'desc'})

         } else {

             const sortedUsersList = await this.state.usersList.sort(function (x, y) {
                 return x.timestamp - y.timestamp;
             })
              this.setState({usersList: sortedUsersList, sortDirection: 'asc'})

         }
     }
     fetchData = async () => {
        this.setState({isLoading: true, error: null})

         const result = await api.getUsersDiff()
             .catch(err => this.setState({error: err.code}))

         if(result){

             if (result.data.length === 0){
                 this.setState({noMoreData: true})
             }
           await this.state.usersList.push(...result.data);
              await this.setState({
                 isLoading: false,
                 error: null
             })
             if (this.state.sortDirection === 'desc'){
                 const sortedUsersList = await this.state.usersList.sort( function (x,y) {
                     return y.timestamp - x.timestamp;
                 })
                 this.setState({usersList: sortedUsersList})
             } else {
                 const sortedUsersList = await this.state.usersList.sort( function (x,y) {
                     return x.timestamp - y.timestamp;
                 })
                 this.setState({usersList: sortedUsersList})
             }


         }

    };
    render() {

        return (
           <div>
               <List
               data={this.state.usersList}
               sortUsersList={this.sortUsersList}
               />
               {
                   this.state.isLoading && !this.state.error &&
                   <div style={{margin: '10px', textAlign: "center", color: 'rgb(25, 118, 210)'}}><CircularProgress/></div>
               }
               {
                   this.state.error &&
                   <div style={{margin: '10px', textAlign: "center", color: "red"}}>We had problems fetching your data. Please try again.</div>
               }
               { !this.state.isLoading && !this.state.noMoreData &&
                   <div style={{margin: '10px', textAlign: "center"}}>
                       <Button variant={'contained'} color={"primary"} style={{textTransform: 'none'}} onClick={this.fetchData}>Load more</Button>
                   </div>
               }
               { this.state.error && !this.state.noMoreData &&
               <div style={{margin: '10px', textAlign: "center"}}>
                   <Button variant={'contained'} color={"primary"} style={{textTransform: 'none'}} onClick={this.fetchData}>Retry</Button>
               </div>
               }
               { this.state.noMoreData &&
               <div style={{margin: '10px', textAlign: "center"}}> No more data to load</div>
               }
           </div>
        );
    }
    async componentDidMount(){
        const usersList = await api.getUsersDiff();
        const sortedUsersList =  usersList.data.sort( function (x,y) {
            return y.timestamp - x.timestamp;
        })

        await this.setState({
            usersList: sortedUsersList,
            isLoading: false
        })
    }
}
export default Users;