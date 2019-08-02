import React from 'react';
import { inject, observer } from "mobx-react";

import "./Main.css";
import Spinner from '../../components/Spinner/Spinner';


@inject("categories")
@observer
class Main extends React.PureComponent {
    render() {
      const { images, fetching } = this.props.categories;

      return (
        <div className="main">
          <div className="wrapper">
            {this.renderImages(images)}
            <Spinner
              left={'60%'}
              top={'60%'}
              fontSize={'3em'}
              visible={fetching}
            />
          </div>
          <div className="btn_wrapper">
            <button className="btn_more" onClick={this.handleMoreClick}>
              More
            </button>
          </div>
        </div>
      );
    }

    componentDidMount() {
      const { limit, page, activeCategory, getSingleCategory } = this.props.categories;
      if (activeCategory !== -1) {
        getSingleCategory(activeCategory, limit, page, false);
      }
    }

    componentDidUpdate(prevProps) {
      const { limit, page, activeCategory, getSingleCategory, images } = this.props.categories;
      if (images.length === 0 && activeCategory !== -1) {
        console.log(this.props)
        getSingleCategory(activeCategory, limit, page, false);
      }
    }

    ///////////////////////////////////////////////////////////////////////
    //  RENDER METHODS
    ///////////////////////////////////////////////////////////////////////
    renderImages(images) {
      return images.map((item, i) => {
        return (<img key={item.id + i} src={item.url} width={450} height={400} alt={item.id} className="img"></img>);
      });
    }

    ///////////////////////////////////////////////////////////////////////
    //  EVENT HANDLERS
    ///////////////////////////////////////////////////////////////////////
    handleMoreClick = () => {
      const { limit, page, activeCategory, getSingleCategory } = this.props.categories;
      getSingleCategory(activeCategory, limit, page + 1, true);
    }
}

export default Main;