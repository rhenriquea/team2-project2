<template>
  <NuxtLink
    v-if="movie"
    v-slot="{ navigate }"
    class="movie"
    :to="`/admin/movie/${movie.id}`"
    custom
  >
    <a role="link" @click="navigate">
      <div class="movie__line">
        <div
          class="movie__thumbnail"
          :style="{ backgroundImage: `url(${movie.cover})` }"
        ></div>
        <div class="p movie__content">
          <h3>{{ movie.title }} ({{ movie.year }})</h3>
          <p class="movie__description">
            {{ movie.description }}
          </p>

          <p class="movie__footer">
            <strong>Genres:</strong>
            <span> {{ movie.genres.toString()}} </span>
            <br />
            <strong>Actors:</strong>
            <span> {{ movie.actors.toString()}} </span>
          </p>
          <div class="actions">
            <AnchorButton
              :to="`admin/movie/${movie.id}`"
              icon="edit"
              label="Edit"
            />
            <CustomButton type="button" label="Delete" />
          </div>
        </div>
      </div>
    </a>
  </NuxtLink>
</template>

<script>
import AnchorButton from '~/components/forms/AnchorButton'
import CustomButton from '~/components/forms/CustomButton'
export default {
  components: { AnchorButton, CustomButton },
  props: {
    movie: undefined,
  },
}
</script>

<style lang="scss" scoped>
.movie {
  a {
    color: unset;
    text-decoration: none;
  }

  &__line {
    display: flex;
    overflow: hidden;

    h3 {
      font-size: 1.2em;
      line-height: 1.3;
      margin: 0;
      margin: 5px 0;
    }
  }

  &__content {
    width: 100%;
    .actions {
      display: none;
    }

    &:hover {
      background-color: #191919;

      .actions {
        display: block;
      }
    }
  }

  &__thumbnail {
    background-position: center center;
    background-size: cover;
    height: 150px;

    @include mq($breakpoint-sm) {
      min-width: 150px;
    }
  }

  &__category {
    margin-left: 5px;
  }

  &__description {
    color: #c1c1c1;
    font-size: 14px;
    line-height: 16px;
  }

  &__footer {
    font-size: 14px;
    strong {
      color: #777;
      font-weight: 300;
    }
  }
}
</style>
