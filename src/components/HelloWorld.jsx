import React, {Component} from 'react'

class HellowWorld extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: '',
            repos: []
        }
        this.onRepoCardClick = this.onRepoCardClick.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onRepoCardClick(repoName, owner) {
        let url = `https://api.github.com/repos/${owner}/${repoName}/issues`

        fetch(url).then( data => {
            return data.json()
        }).then( response => {
            console.log(response)
        }).catch( err => {
            console.error(err)
        })
    }

    formSubmit(e) {
        e.preventDefault()
        let repo = this.state.value
        let url = `https://api.github.com/search/repositories?q=${repo}`

        fetch(url).then( data => {
            return data.json()
        }).then( response => {
            let repos = response.items
            this.setState({
                repos: repos
            })
        }).catch( err => {
            console.error(err)
        })
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    renderRepos() {
        let {repos} = this.state
        return this.state.repos.map( (el, index) => {
            return(
                <div key={index} className="card mb-3">
                    <div className="card-block">
                        <p onClick={() => this.onRepoCardClick(el.name, el.owner.login)}> Name: {el.name} </p>
                        <p> Description: {el.description} </p>
                        <p> Stars: {el.stargazers_count} </p>
                    </div>
                </div>
            )
        })

    }

    render () {
        const value = this.state.value
        return (
            <div className="container">
                <form className="form-inline mb-3" onSubmit={this.formSubmit}>
                    <input className="form-control mr-3" placeholder="Search Repositories" type="text" value={value} onChange={this.onChange} />
                    <button> Submit </button>
                </form>
                {this.renderRepos()}
            </div>
        );
    }
}

export default HellowWorld;
