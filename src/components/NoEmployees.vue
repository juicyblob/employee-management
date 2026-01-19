<template>
    <div class="no-employees">
        <span class="no-employees__text">В этой категории нет сотрудников</span>
    </div>
</template>

<style scoped lang="scss">
    .no-employees {
        border: 1px dashed var(--color-gray);
        border-radius: 16px;
        min-height: 364px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &__text {
            font-size: 20px;
            font-weight: 300;
            color: var(--color-gray);
        }

    }
</style>