<template>
  <div class="category-widget" v-click-outside="toggleOffDropdown">
    <input
      class="category-widget__input input"
      placeholder="Category"
      @focus="isShowDropDown = true"
    />

    <div class="dropdown" v-if="isShowDropDown">
      <div class="dropdown__wrapper">
        <header class="dropdown__header">
          <button class="dropdown__btn" @click="choseAll()">Выбрать все</button>
          <input
            class="dropdown__search-input input"
            type="text"
            v-model="search"
          />
        </header>
        <ul class="list">
          <li
            class="list__item"
            v-for="category in categories"
            :key="category.id"
          >
            <input
              class="list__input"
              type="checkbox"
              :id="category.id"
              :value="category"
              v-model="chosedCategories"
            /><label class="list__label" :for="category.id">{{
              category.title
            }}</label>
          </li>
        </ul>
      </div>
      <button
        :disabled="!chosedCategories.length > 0"
        class="dropdown__apply-btn"
        @click="apply"
      >
        Apply
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import { getCategories } from "@/api";

export default {
  name: "CategoryFilter",
  data() {
    return {
      isShowDropDown: false,
      categories: {},
      search: "",
      chosedCategories: [],
    };
  },
  watch: {
    search: _.debounce(function () {
      this.categories = {};
      this.searchCategories();
    }, 300),
  },
  created() {
    axios.defaults.headers.common.Authorization = "Bearer BT3HK2NpCnyrKiDo";
    this.searchCategories();
  },
  methods: {
    toggleOffDropdown() {
      this.isShowDropDown = false;
    },
    async searchCategories() {
      try {
        const formdata = new FormData();
        formdata.append("limit", "50");
        formdata.append("offset", "0");
        formdata.append("search", `${this.search}`);
        const response = await getCategories(formdata);
        if (response.data?.message?.data) {
          this.categories = response.data.message.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    choseAll() {
      if (this.chosedCategories.length != this.categories.length) {
        this.chosedCategories = [];
        this.categories.map((el) => {
          this.chosedCategories.push(el);
        });
      } else {
        this.chosedCategories = [];
      }
    },
    apply() {
      console.log(this.chosedCategories);
    },
  },
};
</script>

<style lang="scss">
.category-widget {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.input {
  width: 100%;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid rgba($color: #000000, $alpha: 0.3);
}

.dropdown {
  position: absolute;
  top: 30px;
  left: 0;
  padding: 10px;
  border: 1px solid rgba($color: #000000, $alpha: 0.3);
  border-radius: 4px;
  &__wrapper {
    max-height: 300px;
    overflow-y: auto;
  }
  &__header {
    display: flex;
  }
  &__btn {
    font-size: 16px;
    border: none;
    background-color: transparent;
    min-width: 50%;
    text-align: left;
    vertical-align: bottom;
    color: rgb(0, 110, 255);
  }
  &__apply-btn {
    padding: 4px 14px;
    background-color: rgb(25, 20, 66);
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.list {
  list-style-type: none;
  &__item {
    margin-bottom: 6px;
  }
  &__input {
    margin-right: 6px;
  }
  &__label {
    font-weight: 700;
    color: rgba($color: #000000, $alpha: 0.6);
    text-transform: capitalize;
  }
}
</style>
