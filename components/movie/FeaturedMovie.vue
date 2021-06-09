<template>
  <div v-if="movie">
    <section
      class="featured--cover"
      :style="{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${movie.cover})`,
      }"
    >
      <div class="featured--horizontal-transparency">
        <div class="featured--vertical-transparency">
          <h1 class="featured--title">
            {{ movie.title }}
          </h1>

          <div class="featured--genres">
            <strong>Genres:</strong>
            {{ movie.genres.toString().replaceAll(',', ', ') }}
          </div>
          <div class="featured--genres">
            <strong>Actors:</strong>
            {{ movie.actors.toString().replaceAll(',', ', ') }}
          </div>

          <div class="featured--description">{{ movie.description }}</div>
          <div class="featured--buttons">
            <span v-if="allowEdit">
              <AnchorButton
                :to="`admin/movie/${movie.id}`"
                icon="edit"
                label="Edit"
              />
              <CustomButton type="button" label="Delete" />
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AnchorButton from '../forms/AnchorButton'
import CustomButton from '../forms/CustomButton'

export default {
  components: { AnchorButton, CustomButton },
  props: {
    movie: undefined,
    allowEdit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    rating: 4,
  }),
  computed: {
    description() {
      let description = this.item.overview
      if (description.length > 200) {
        description = `${description.substring(0, 200)}...`
      }
      return description
    },
    genres() {
      const genres = []
      for (const i in this.item.genres) {
        genres.push(this.item.genres[i].name)
      }
      return genres.join(', ')
    },
  },
}
</script>

<style lang="scss">
.featured {
  &--cover {
    height: 75vh;
  }

  &--horizontal-transparency {
    background: linear-gradient(to top, #111 10%, transparent 90%);
    height: inherit;
    width: inherit;
  }

  &--vertical-transparency {
    background: linear-gradient(to right, #111 30%, transparent 70%);
    display: flex;
    flex-direction: column;
    height: inherit;
    justify-content: center;
    padding-bottom: 100px;
    padding-left: 30px;
    padding-top: 70px;
    width: inherit;
  }

  &--title {
    font-size: 4em;
  }

  &--description {
    color: #999;
    margin-top: 15px;
    max-width: 40%;

    @media (max-width: 760px) {
      font-size: 14px;
      margin-right: 30px;
      max-width: 100%;
    }
  }

  &--genres {
    color: #999;
    font-size: 15px;
    strong {
      font-weight: 400;
    }
  }

  &--buttons {
    margin-top: 20px;
  }
}
</style>
