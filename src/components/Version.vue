<template>
    <span class="version">Версия 1.0.4</span>
</template>

<style scoped lang="scss">
    .version {
        font-weight: 300;
        font-size: 14px;
        line-height: 171%;
        color: var(--color-white);
        margin-top: auto;

        @media (max-width: 1280px) {
            font-size: 13px;
        }

        @media (max-height: 646px) {
            display: none;
        }
    }
</style>