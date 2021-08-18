<script>
export default {
  name: "profile-item",
  props: {
    name: {
      type: String,
      default: "John Doe",
    },
    description: {
      type: String,
      default: "Lorem ipsum dolor site amet",
    },
    stars: {
      type: Number,
      default: 0,
    },
    forks: {
      type: Number,
      default: 0,
    },
    watchers: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: "@/assets/logo.png",
    },
    url: {
      type: String,
      default: "/",
    },
  },
};
</script>

<template>
  <a :href="url" :title="name" class="profile-item">
    <div class="__container">
      <img :src="avatar" :alt="`${name} avatar`" class="__avatar" />
      <div class="__info">
        <h3 class="__name">{{ name }}</h3>
        <p class="__description">{{ description }}</p>
        <div class="__statistics">
          <div class="__item">
            <img src="@/assets/star.svg" alt="Icon" class="__icon" />
            <span class="__value">{{ stars }}</span>
          </div>

          <div class="__item">
            <img src="@/assets/fork.svg" alt="Icon" class="__icon" />
            <span class="__value">{{ forks }}</span>
          </div>

          <div class="__item">
            <img src="@/assets/eye.svg" alt="Icon" class="__icon" />
            <span class="__value">{{ watchers }}</span>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<style lang="scss">
.profile-item {
  display: flex;
  color: inherit;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  .__container {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2.5rem 4rem 2.5rem 2rem;
    width: 30rem;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 0.5rem;
    background: white;

    .__avatar {
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
      object-fit: contain;
    }

    .__info {
      flex: 1;

      .__name {
        font-size: 1.25rem;
        font-weight: 700;
        text-align: start;
        color: #515151;
        margin-bottom: 1rem;

        max-width: 16rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .__description {
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.2rem;
        text-align: start;
        height: 3.6rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 1rem;
      }

      .__statistics {
        display: flex;
        /* max-width: 10rem; */
        justify-content: space-between;

        .__item {
          display: flex;
          align-items: center;
          gap: 0.25rem;

          .__icon {
            height: 1rem;
            width: 1rem;
          }

          .__value {
            font-size: 0.75rem;
            font-weight: 400;
            color: #919191;
          }
        }
      }
    }
  }
}
</style>
