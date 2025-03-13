<script setup>
import { ref } from 'vue'

const newsList = ref([
  {
    id: 1,
    title: '我們是METRO GO',
    description: '現在註冊會員就享有10,000積分！！',
    date: '2025/1/20'
  },
  {
    id: 2,
    title: '恭喜ooo獲得全至霸',
    description: '恭喜獲獎！',
    date: '2025/1/20'
  }
])

const handleViewMoreNews = () => {
  console.log('查看更多新聞')
}

const handleReadMore = (news) => {
  console.log('閱讀更多:', news)
}
</script>

<template>
  <section class="news">
    <div class="news-wrapper">
      <div class="section-header">
        <h2>好消息別錯過</h2>
        <!-- <button class="view-more" @click.prevent="handleViewMoreNews">
          所有最新消息
        </button> -->
        <RouterLink to="/news" custom v-slot="{ navigate }">        
          <button class="view-more" @click="handleViewMoreNews(); navigate()">
            所有最新消息
          </button>
        </RouterLink>
      </div>
      <div class="news-list">
        <div v-for="news in newsList" :key="news.id" class="news-card">
          <div class="news-avatar">GO</div>
          <div class="news-content">
            <h3>{{ news.title }}</h3>
            <p>{{ news.description }}</p>
          </div>
          <div class="news-meta">
            <span class="news-date">{{ news.date }}</span>
            <a class="news-link" @click.prevent="handleReadMore(news)">了解更多 →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.news {
  width: 100%;
  background: white;
  padding: 40px 120px;
  overflow: hidden;
  
  // 平板和手機適配
  @media (max-width: 1024px) {
    padding: 40px 60px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
  
  .news-wrapper {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 var(--container-padding);

    @media (max-width: 768px) {
      padding: 0;
    }
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 10px;
    border-bottom: 1px solid #333;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    h2 {
      font-size: 1.8rem;
      color: #333;

      @media (max-width: 1024px) {
        font-size: 1.5rem;
      }

      @media (max-width: 768px) {
        font-size: 1.3rem;
      }
    }

    .view-more {
      background: #6a0dad;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      font-size: 18px;
      
      @media (max-width: 768px) {
        width: 100%;
        text-align: center;
        font-size: 16px;
        padding: 10px;
      }
      
      &:hover {
        background: #8a2be2;
      }
    }
  }

  .news-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .news-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1.5rem;
      align-items: center;
      box-shadow: 0 2px 8px rgba(106, 13, 173, 0.1);

      // 平板尺寸調整
      @media (max-width: 1024px) {
        gap: 1rem;
        padding: 15px;
      }
      
      // 手機版改為垂直排列
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .news-avatar {
        width: 120px;
        height: 120px;
        background: #6a0dad;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;

        @media (max-width: 1024px) {
          width: 100px;
          height: 100px;
        }

        @media (max-width: 768px) {
          width: 80px;
          height: 80px;
          margin: 0 auto;
        }
      }

      .news-content {
        @media (max-width: 768px) {
          text-align: center;
          margin: 10px 0;
        }

        h3 {
          margin-bottom: 0.5rem;
          color: #333;
          font-size: 1.2rem;

          @media (max-width: 1024px) {
            font-size: 1.1rem;
          }

          @media (max-width: 768px) {
            font-size: 1rem;
          }
        }

        p {
          color: #666;
          font-size: 0.9rem;

          @media (max-width: 768px) {
            font-size: 0.85rem;
          }
        }
      }

      .news-meta {
        text-align: right;

        @media (max-width: 768px) {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .news-date {
          display: block;
          color: #666;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;

          @media (max-width: 768px) {
            margin-bottom: 0;
          }
        }

        .news-link {
          color: #6a0dad;
          text-decoration: none;
          cursor: pointer;
          font-size: 0.9rem;
          transition: color 0.3s ease;
          
          &:hover {
            color: #8a2be2;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>