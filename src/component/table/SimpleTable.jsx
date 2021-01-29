import React, { Component } from 'react';
import './SimpleTable.css';


class SimpleTable extends Component {

    constructor(props) {
        super(props);

        this.setPreviousPage = this.setPreviousPage.bind(this);
        this.setNextPage = this.setNextPage.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);

        this.state = {
            id: "simpleTable-" + Date.now(),
            page: 1,
            numberDisplayed: 1,
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.elements !== this.props.elements) {
            this.updateDimensions();
            if (this.state.page > Math.floor(this.props.elements.length / this.state.numberDisplayed + 1)) {
                this.setState({ page : Math.floor(this.props.elements.length / this.state.numberDisplayed + 1) })
            }
        }

        if (prevProps.isVisible === false && this.props.isVisible === true) {
            setTimeout(() => {
                this.updateDimensions();
            }, 50);
        }
    }

    setPreviousPage() {
        this.setState({ page : this.state.page - 1 });
    }

    setNextPage() {
        this.setState({ page : this.state.page + 1 });
    }

    updateDimensions() {
        let table = document.getElementById(this.state.id);

        if (typeof table !== "undefined" && table !== null) {
            if (typeof table.firstChild.firstChild !== "undefined" && table.firstChild.firstChild !== null) {
                let element = table.firstChild.firstChild;
                let style = element.currentStyle || window.getComputedStyle(element);
                let childHeight = element.offsetHeight;
                let marginTop = isNaN(style.marginTop) ? 0 : parseInt(style.marginTop , 10);
                let marginBot = isNaN(style.marginBottom) ? 0 : parseInt(style.marginBottom, 10);
                let margins = marginTop + marginBot;

                if (childHeight === 0) {
                    this.setState({numberDisplayed: 1});
                } else {
                    this.setState({
                        numberDisplayed: Math.floor(table.firstChild.offsetHeight / (childHeight + margins))
                    });
                }
            }
        }
    }

    render() {
        let minDisplayed = Math.min(this.state.page*this.state.numberDisplayed-(this.state.numberDisplayed-1), this.props.elements.length);
        let maxDisplayed = Math.min(this.state.page*this.state.numberDisplayed, this.props.elements.length);

        return (
            <div id={this.state.id} className={"simpleTable " + (this.props.className ? this.props.className : "")}>
                <div className="simpleTable-elements">
                    {this.props.elements.slice().splice(minDisplayed-1, this.state.numberDisplayed).map((o) => {
                        return this.props.buildElement(...o);
                    })}
                </div>
                <div className="simpleTable-info">
                    {minDisplayed}-{maxDisplayed} on {this.props.elements.length}
                </div>
                <div className={"simpleTable-arrowLeft"}>
                    <i className={"fas fa-arrow-left hoverEffect elementIcon " +
                        (minDisplayed <= 1 ? "iconDisabled" : "")}
                        onClick={this.setPreviousPage}/>
                </div>
                <div className={"simpleTable-arrowRight"}>
                    <i className={"fas fa-arrow-right hoverEffect elementIcon " +
                        (maxDisplayed === this.props.elements.length ?
                            "iconDisabled" : "")}
                        onClick={this.setNextPage}/>
                </div>
            </div>
        );
    }
}

export default SimpleTable;