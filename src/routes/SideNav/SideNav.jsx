import React from 'react';
import { inject, observer } from "mobx-react";

import "./SideNav.css";

@inject("categories")
@observer
class SideNav extends React.PureComponent {

    render() {
      const { items } = this.props.categories;

      return (
          <div className="side">
            <h2>Categories</h2>
            <div className="navbar">
              <ul>                  
                {this.renderCategories(items)}
              </ul>
            </div>
          </div>
      );
    }

    componentDidMount() {
      const { getAllCategories } = this.props.categories;
      getAllCategories();
    }

    ///////////////////////////////////////////////////////////////////////
    //  RENDER METHODS
    ///////////////////////////////////////////////////////////////////////
    renderCategories(categories) {
      const { activeCategory } = this.props.categories;

      return categories.map((category, i) => {
        let style = (activeCategory === category.id) ? 'active_link' : '';
        return (<li className={style} key={category.id} onClick={() => this.handleSelectCategory(category.id)}>{category.name}</li>)
      })
    }

    ///////////////////////////////////////////////////////////////////////
    //  EVENT HANDLERS
    ///////////////////////////////////////////////////////////////////////
    handleSelectCategory = (categoryId) => {
      const { selectCategory } = this.props.categories;
      selectCategory(categoryId)
    }
}

export default SideNav;