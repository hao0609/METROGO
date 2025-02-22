<template>
  <div class="font-guide">
    <p style="margin-bottom: 40px">****** 字體樣式 ******</p>

    <!-- H1 -->
    <section class="guide-section bg-primary-400">
      <p class="section-title txt-primary-400">h1</p>
      <h1>H1 標題文字</h1>
    </section>

    <!-- H2 -->
    <section class="guide-section">
      <p class="section-title txt-neutral-0">h2</p>
      <h2>H2 標題文字</h2>
    </section>

    <!-- Title 1 -->
    <section class="guide-section">
      <p class="section-title">class="title1"</p>
      <div class="title1 bold">Title 1 粗體樣式</div>
      <div class="title1">Title 1 標準樣式</div>
    </section>

    <!-- Title 2 -->
    <section class="guide-section">
      <p class="section-title">class="title2"</p>
      <div class="title2 bold">Title 2 粗體樣式</div>
      <div class="title2">Title 2 標準樣式</div>
    </section>

    <!-- 內文 p -->
    <section class="guide-section">
      <p class="section-title">p</p>
      <p class="bold">
        p
        粗體樣式：力母吉一放多爪活像是昔房朵急首公！哭今泉乍田苦裏吉音色冬視怎院打常：朵沒几春記頭天禾牙高石，助詞念布米扒就時飽麼喜安胡二鳥。
      </p>
      <p>
        p
        標準樣式：力母吉一放多爪活像是昔房朵急首公！哭今泉乍田苦裏吉音色冬視怎院打常：朵沒几春記頭天禾牙高石，助詞念布米扒就時飽麼喜安胡二鳥。
      </p>
    </section>

    <!-- Caption -->
    <section class="guide-section">
      <p class="section-title">class="caption"</p>
      <p class="caption bold">
        caption
        粗體樣式：力母吉一放多爪活像是昔房朵急首公！哭今泉乍田苦裏吉音色冬視怎院打常：朵沒几春記頭天禾牙高石，助詞念布米扒就時飽麼喜安胡二鳥。
      </p>
      <p class="caption">
        caption
        標準樣式：力母吉一放多爪活像是昔房朵急首公！哭今泉乍田苦裏吉音色冬視怎院打常：朵沒几春記頭天禾牙高石，助詞念布米扒就時飽麼喜安胡二鳥。
      </p>
    </section>

    <p style="margin: 40px 0">****** 按鈕樣式 ******</p>
    <section style="display: flex; flex-direction: column; gap: 20px">
      <!-- size: Regular -->
      <button class="btn_filled">按鈕</button>
      <button class="btn_outline">按鈕</button>
      <button class="btn_white">按鈕</button>
      <button class="btn_filled" disabled>禁止按鈕</button>
      <!-- size: Small -->
      <button class="btn_filled small">按鈕</button>
      <button class="btn_outline small">按鈕</button>
      <button class="btn_white small">按鈕</button>

      <!-- <v-btn class="btn_filled small">Button</v-btn> -->

      <!-- check box -->
      <p style="margin: 40px 0">****** checkbox樣式 ******</p>
      <label>
        <input class="checkbox" type="checkbox" />
        <span class="checkbox-custom"></span> A
      </label>
    </section>

    <!-- radio box -->
    <p style="margin: 40px 0">****** radiobox樣式 ******</p>
    <div class="radio-group">
      <label class="radio-container">
        <input type="radio" name="option" class="radio-input" value="1" />
        <span class="radio-custom"></span>
        <span class="radio-label">上架</span>
      </label>

      <label class="radio-container">
        <input type="radio" name="option" class="radio-input" value="2" />
        <span class="radio-custom"></span>
        <span class="radio-label">下架</span>
      </label>
    </div>

    <!-- 小編精選輪播 -->
    <p style="margin: 40px 0">****** 小編精選輪播 ******</p>
    <div class="carousel">
      <div
        class="carousel-inner"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div class="carousel-item" v-for="(item, index) in items" :key="index">
          <div class="carousel-content-container">
            <img :src="item.image" :alt="item.alt" />
            <div class="carousel-content">
              <h3 class="title2 bold">{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <button class="btn_white small" @click="goToLink(item.link)">
                閱讀更多
              </button>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control prev" @click="prevSlide">&#10094;</button>
      <button class="carousel-control next" @click="nextSlide">&#10095;</button>
    </div>

    <!-- input -->
    <p style="margin: 40px 0">****** input 樣式 ******</p>
    <section>
      <div class="form-group">
        <label class="input-label">標題文字</label>
        <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder" />
        </div>
      </div>

      <div class="form-group error">
        <label class="input-label">標題文字</label>
        <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder" />
          <span class="error-message">錯誤訊息</span>
        </div>
      </div>

      <div class="form-group disabled">
        <label class="input-label">標題文字</label>
        <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="禁用文字" disabled />
        </div>
      </div>

      <div class="form-group">
        <label class="input-label required">驗證碼</label>
        <div class="input-wrapper with-button">
          <input type="text" class="input-field" placeholder="請輸入驗證碼" />
          <button class="text-button">重送驗證碼</button>
        </div>
      </div>

      <!-- 小尺寸 -->
      <div class="input-wrapper small">
        <input type="text" class="input-field" placeholder="小尺寸輸入框" />
      </div>
    </section>

    <!-- select -->
    <p style="margin: 40px 0">****** 下拉選單 樣式 ******</p>
    <section style="display: flex; flex-direction: column; gap: 20px">
      <!-- 一般狀態 -->
      <div class="select-group">
        <label class="select-label">標題文字</label>
        <div class="select-wrapper">
          <select class="select-field">
            <option value="" disabled selected>下拉選項</option>
            <option value="option1">選項一</option>
            <option value="option2">選項二</option>
          </select>
          <span class="select-arrow"></span>
        </div>
      </div>

      <!-- 錯誤狀態 -->
      <div class="select-group">
        <label class="select-label required">標題文字</label>
        <div class="select-wrapper error">
          <select class="select-field">
            <option value="" disabled selected>下拉選項</option>
            <option value="option1">選項一</option>
            <option value="option2">選項二</option>
          </select>
          <span class="select-arrow"></span>
          <span class="error-message">錯誤訊息</span>
        </div>
      </div>

      <!-- 禁用狀態 -->
      <div class="select-group">
        <label class="select-label">標題文字</label>
        <div class="select-wrapper disabled">
          <select class="select-field" disabled>
            <option value="" disabled selected>禁止選項</option>
          </select>
          <span class="select-arrow"></span>
        </div>
      </div>

      <!-- 小尺寸 -->
      <div class="select-wrapper small">
        <select class="select-field">
          <option value="" disabled selected>小尺寸下拉</option>
          <option value="option1">選項一</option>
          <option value="option2">選項二</option>
        </select>
        <span class="select-arrow"></span>
      </div>
    </section>
  </div>



  <!-- Form -->
  <template>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'VIP' ? 'gold' : tag === 'new' ? 'green' : 'blue'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite {{ record.userEmail }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
        </span>
      </template>
    </template>
  </a-table>
</template>

<<<<<<< HEAD











</template>

<script setup>

import { ref } from 'vue'; 

import { Table, Tag, Divider } from 'ant-design-vue';

const count = ref(0);

const columns = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: 'User Email',
    dataIndex: 'userEmail',
    key: 'userEmail',
  },
  {
    title: 'Register Date',
    dataIndex: 'registerDate',
    key: 'registerDate',
  },
  {
    title: 'User Points',
    dataIndex: 'userPoint',
    key: 'userPoint',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
]);

const data = ref([
  {
    id: 1,
    userId: 101,
    userEmail: 'john@example.com',
    registerDate: '2024-02-10',
    userPoint: 120,
    tags: ['VIP', 'active'],
  },
  {
    id: 2,
    userId: 102,
    userEmail: 'jane@example.com',
    registerDate: '2024-01-22',
    userPoint: 80,
    tags: ['new', 'inactive'],
  },
  {
    id: 3,
    userId: 103,
    userEmail: 'jack@example.com',
    registerDate: '2023-12-05',
    userPoint: 150,
    tags: ['VIP', 'loyal'],
  },
]);




=======
<script>
// export default {
//   name: "FontGuideView",
// };
//
export default {
  data() {
    return {
      currentIndex: 0,
      items: [
        {
          image:
            "https://cdn-static.tibame.com/banner/316098/images/fefeb74b-d6b1-45d7-9e1b-43142d0caa17.jpg",
          alt: "Image 1",
          title: "Title 1",
          text: "Description for Image 1",
          link: "/page1",
        },
        {
          image: "src/assets/images/sample.jpg",
          alt: "Image 2",
          title: "Title 2",
          text: "Description for Image 2",
          link: "/page2",
        },
        {
          image:
            "https://cdn-static.tibame.com/banner/316098/images/fefeb74b-d6b1-45d7-9e1b-43142d0caa17.jpg",
          alt: "Image 3",
          title: "Title 3",
          text: "Description for Image 3",
          link: "/page3",
        },
      ],
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
    goToLink(link) {
      window.location.href = link;
    },
  },
};
>>>>>>> e4c67585005483ed2d6001f5026e27d2145decdd
</script>

<style lang="scss" scoped>
.font-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
}

.guide-section {
  margin-bottom: 48px;

  .section-title {
    font-size: 20px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #cacaca;
  }
}

/* 小編精選輪播 */
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1080px;
  margin: auto;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-content-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.carousel-item img {
  display: block;
  width: 50%;
  height: auto;
}

.carousel-content {
  display: flex;
  flex-direction: column;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}

@media (max-width: 768px) {
  .carousel-content-container {
    flex-direction: column;
    text-align: center;
  }
  .carousel-item img {
    width: 100%;
  }
  .carousel-content p {
    display: none;
  }
}
</style>
