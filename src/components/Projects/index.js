import React from 'react';
import List from './List'
import api from "../../lib/api";
import {Button, CircularProgress} from "@material-ui/core";
import {sortAsc, sortDesc} from "../../lib/api";
class Projects extends React.Component {

    state = {
        projectsList: null,
        isLoading: true,
        error: null,
        sortDirection: 'desc',
        noMoreData: false
    }
    sortProjectsList = async (sortDirection) => {

        if (sortDirection === 'desc') {

            const sortedProjectsList = await sortDesc(this.state.projectsList)
            this.setState({projectsList: sortedProjectsList, sortDirection: 'desc'})

        } else {
            const sortedProjectsList = await sortAsc(this.state.projectsList)
            this.setState({projectsList: sortedProjectsList, sortDirection: 'asc'})
        }
    }
    fetchData = async () => {
        this.setState({isLoading: true, error: null})

        const result = await api.getProjectsDiff()
            .catch(err => this.setState({error: err.code}))

        if(result){
            if (result.data.length === 0){
                this.setState({noMoreData: true})
            }
            await this.state.projectsList.push(...result.data);
            await this.setState({
                isLoading: false,
                error: null
            })
            if (this.state.sortDirection === 'desc'){
                const sortedProjectsList = await sortDesc(this.state.projectsList)
                this.setState({projectsList: sortedProjectsList})
            } else {
                const sortedProjectsList = await sortAsc(this.state.projectsList)
                this.setState({projectsList: sortedProjectsList})
            }
        }
    };

    render() {

        return (
            <div>
                <List
                    data={this.state.projectsList}
                    sortProjectsList={this.sortProjectsList}
                />
                {
                    this.state.isLoading && !this.state.error &&
                    <div style={{margin: '10px', textAlign: "center"}}><CircularProgress/></div>
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
        const projectsList = await api.getProjectsDiff();
        const sortedProjectsList =  sortDesc(projectsList.data)

        await this.setState({
            projectsList: sortedProjectsList,
            isLoading: false
        })
    }
}
export default Projects;