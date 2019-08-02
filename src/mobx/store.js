import axios from "axios";
import { observable, action, computed, runInAction } from 'mobx';
import * as constants from './constants';

class CategoriesStore {
  @observable fetching= false;
  @observable error= false;
  @observable items= [];
  @observable images= [];
  @observable limit= 10;
  @observable page= 0;
  @observable activeCategory= -1;

  @computed
  get getActiveCategory() {
    return this.activeCategory;
  }

 /*  @computed
  get getImages() {
    return this.images;
  }  */

  @action
  selectCategory = (categoryId) => {
    this.activeCategory = categoryId;
    this.images = [];
  }

  @action
  getAllCategories = () => {
    const url = `${constants.BASE_URL}/categories`;

    this.fetching = true;
    return axios.get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => {
        const { data } = response;
        runInAction(() => {
          this.items = data;
          this.activeCategory= data && data[0].id
          this.fetching = false;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.fetching = false;
          this.error = true;
          console.log(err);
        })
      });
  };

  @action
  getSingleCategory = (categoryId, limit, page, isMore) => {
    const url = `${constants.BASE_URL}/images/search?category_ids=${categoryId}&limit=${limit}&page=${page}`;

    this.fetching = true;
    return axios.get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => {
        runInAction(() => {
          const { data: imagesData } = response;

          if (isMore) {
            this.images = [...this.images, ...imagesData];
          } else {
            this.images = [...imagesData]; 
          }
          this.fetching = false;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.fetching = false;
          this.error = true;
          console.log(err);
        });
      });
  };
}

const categories = window.store = new CategoriesStore(); //used new to create singleton or single store instance

export default categories;
