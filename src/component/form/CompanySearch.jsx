import React from 'react';
import './CompanySearch.css';
import CheckBox from './CheckBox';
import Chip from "./Chip";
import FormLine from './FormLine';
import {getRequest} from '../../utils/request';
import {NotificationManager as nm} from 'react-notifications';


export default class CompanySearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: null
        }
    }

    componentDidMount() {
        this.getTags()
    }

    getTags() {
        getRequest.call(this, "public/get_public_taxonomy_values", data => {
            this.setState({
                tags: data,
            });
        }, response => {
            nm.warning(response.statusText);
        }, error => {
            nm.error(error.message);
        });
    }

    render() {
        return (
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <h1>Filter</h1>
                    </div>

                    <div className={"col-md-6"}>
                        <FormLine
                            label={"Company name"}
                            value={this.props.filters.name === undefined ?
                                []: this.props.filters.name}
                            onChange={v => this.props.onChange("name", v)}
                            labelWidth={4}
                        />
                    </div>

                    <div className={"col-md-6"}>
                        <FormLine
                            label={"Tags"}
                            type={"multiselect"}
                            value={this.props.filters.taxonomy_values === undefined ? 
                                [] : this.props.filters.taxonomy_values}
                            options={this.state.tags !== null ? this.state.tags
                                .map(v => { return {label: v.category + " - " + v.name, value: v.id}})
                                : []}
                            onChange={v => this.props.onChange("taxonomy_values", v)}
                            disabled={this.state.tags === null}
                            labelWidth={4}
                        />
                    </div>

                    <div className={"col-md-12"}>
                        <div className={"right-buttons"}>
                            <button
                                className={"blue-background"}
                                onClick={this.props.onSearch !== undefined ? this.props.onSearch : null}
                            >
                                <i class="fas fa-search"/> Filter
                            </button>
                        </div>
                    </div>
                </div>
        );
    }
}
  