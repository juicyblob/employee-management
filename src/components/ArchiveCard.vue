<script setup lang="ts">
import IconMail from '../assets/svg/IconMail.vue';
import ButtonCard from './ButtonCard.vue';

const { id, photo, name, position, mail } = defineProps<{
    id: number,
    photo: string,
    name: string,
    position: string,
    mail: string,
}>();


</script>

<template>
    <div class="archive__card">
        <div class="archive__card-photo">
            <img :src="photo" alt="Ошибка загрузки">
        </div>
        <div class="archive__card-info">
            <div class="archive__card-name">{{ name }}</div>
            <div class="archive__card-position">{{ position }}</div>
        </div>
        <div class="archive__card-buttons">
            <ButtonCard text="Восстановить" color="green" />
            <ButtonCard text="Удалить" color="red" />
        </div>
        <a :href="`mailto:${mail}`" target="_blank" class="archive__card-mail">
            <IconMail />
        </a>
    </div>

</template>

<style scoped lang="scss">
    .archive__card {
        position: relative;
        background-color: var(--color-white);
        border: 1px solid var(--color-light-gray);
        border-radius: 8px;
        padding: 46px 20px 24px;

        &-photo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: var(--color-silver);
            overflow: hidden;
            margin: 0 auto;

            img {
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }

        &-info {
            font-size: 14px;
            text-align: center;
            margin-top: 12px;
        }

        &-name {
            font-weight: 500;
            color: var(--color-dark);
            margin-bottom: 7px;
        }

        &-position {
            color: var(--color-gray);
        }

        &-buttons {
            margin-top: 26px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        &-mail {
            position: absolute;
            text-decoration: none;
            top: 18px;
            right: 18px;
        }

    }
</style>