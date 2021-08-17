<template>
    <div>
        <van-cell title="开始时间" :value="date" @click="show = true" />
        <van-calendar v-model:show="show" @confirm="onConfirm" :min-date="dateRange.min" :max-date="dateRange.max" />
        <van-cell title="推测可以时间" :value="startDateRef" />
    </div>
</template>

<script>
import { ref,reactive } from 'vue';
import moment from 'moment';
export default {
    setup() {
        const dateRange = reactive({
          min: new Date(2021,8,13),
          max: new Date(2023,12,1)
        })
        const date = ref(moment(new Date).format('YYYY-MM-DD'));
        const show = ref(false);
        const startDateRef = ref('');
        const formatDate = (date) => `${moment(date).format('YYYY-MM-DD')}`;

        const onConfirm = (value) => {
            show.value = false;
            date.value = formatDate(value);
            let time = moment(date.value).add(-280, "days").format('YYYY-MM-DD');
            startDateRef.value = time
        };
        return {
            startDateRef,
            date,
            show,
            dateRange,
            onConfirm,
            
        };
    },
};
</script>

<style>
</style>
