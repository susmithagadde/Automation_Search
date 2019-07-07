import React, { Component } from "react";
import PostData from "../data/post.json";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import "./search.css";

class Search extends Component {
  state = {
    humans: [],
    animals: [],
    status: true,
    updatedlist: [],
    humanlist: [],
    val: ""
  };

  onSearch = event => {
    if (event.target.value !== "") {
      var updated = PostData[0].humans;
      updated = updated.filter(c => {
        return (
          c.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
        );
      });

      if (updated.length > 0) {
        this.setState({
          val: event.target.value,
          humanlist: updated
        });
      }

      var updatedAnimal_list = PostData[0].animals;
      updatedAnimal_list = updatedAnimal_list.filter(c => {
        return (
          c.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
        );
      });

      this.setState({
        humans: updated,
        animals: updatedAnimal_list,
        status: false
      });

      if (updatedAnimal_list.length > 0) {
        this.setState({
          val: event.target.value,
          updatedlist: updatedAnimal_list
        });
      }
    } else {
      this.setState({ status: true });
    }
  };

  chkHighlight = name => {
    var matchStart = name
      .toLowerCase()
      .indexOf("" + this.state.val.toLowerCase() + "");
    var matchEnd = matchStart + this.state.val.length - 1;
    var beforeMatch = name.slice(0, matchStart);
    var matchText = name.slice(matchStart, matchEnd + 1);
    var afterMatch = name.slice(matchEnd + 1);
    var temp = (
      <span>
        {beforeMatch}
        <em className="highlight">{matchText}</em>
        {afterMatch}
      </span>
    );
    return temp;
  };

  componentDidMount() {
    PostData.map((data, index) => {
      this.setState({
        humans: [...this.state.humans, ...data.humans],
        animals: [...this.state.animals, ...data.animals]
      });
      return this.state.humans;
    });
  }

  render() {
    const { status, humans, humanlist, animals, updatedlist } = this.state;
    return (
      <div className="container">
        <div className="row">
          <i className="fa fa-search icon" />
          <input
            type="text"
            placeholder="Search for something..."
            name="search"
            id="search"
            onChange={event => this.onSearch(event)}
          />
          <div>
            {status ? (
              ""
            ) : (
              <div className="result-container">
                <div>
                  <div className="human_titlediv">
                    <div className="human_title">
                      <p className="text-transform">Humans</p>
                    </div>
                  </div>
                  {humans.length > 0 ? (
                    <div>
                      {humans.map((res, key) => (
                        <div key={key} className="human_container">
                          <img src={res.image} alt="Avatar" id="img" />
                          <p>
                            {humanlist.length < 0 ? (
                              <span className="res-name">{res.name}</span>
                            ) : (
                              <span>
                                <span className="res-name">
                                  {this.chkHighlight(res.name)}
                                </span>
                              </span>
                            )}
                            <span className="time-right">{res.city}</span>
                          </p>
                        </div>
                      ))}{" "}
                    </div>
                  ) : (
                    <div>
                      <p className="no-human">No humans found</p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="human_titlediv1">
                    <div className="human_title">
                      <p className="text-transform">Animals</p>
                    </div>
                  </div>
                  {animals.length > 0 ? (
                    <div>
                      {animals.map((res, key) => (
                        <div key={key} className="human_container">
                          <img src={res.image} alt="Avatar" id="img" />
                          <p>
                            {updatedlist.length < 0 ? (
                              <span className="res-name">{res.name}</span>
                            ) : (
                              <span>
                                <span className="res-name">
                                  {this.chkHighlight(res.name)}
                                </span>
                              </span>
                            )}

                            <span className="time-right">{res.city}</span>
                          </p>
                        </div>
                      ))}{" "}
                    </div>
                  ) : (
                    <div>
                      <p className="no-human">No animals found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
