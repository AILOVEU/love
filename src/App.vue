<template>
    <div id="main-page">
        <!-- 配置 -->
        <!-- <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
            dashed>可修改项
        </van-divider> -->
        <!-- 配置 -->
        <van-cell :title="'孕期'+pregnantDayCmp">
            <template v-slot:icon>
                <van-icon class-prefix="my-love" name="zhouqi"></van-icon>
            </template>
            <template v-slot:value>
                <van-stepper v-model="fetationWekRef" theme="round" button-size="22" min="38"
                    max="42" disable-input />
            </template>
        </van-cell>
        <!-- 详情 -->
        <!-- <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
            dashed>详情
        </van-divider> -->
        <!-- 详情 -->
        <van-cell title="怀孕" :value="pregnantDateRef" @click="pregnantDayShowRef = true">
            <template v-slot:icon>
                <van-icon class-prefix="my-love" name="yunfu"></van-icon>
            </template>
        </van-cell>
        <van-cell title="生肖" :value="zodiacAstroRef.split('-')[0]">
            <template v-slot:icon>
                <van-icon class-prefix="my-love" name="baitu"></van-icon>
            </template>
        </van-cell>
        <van-cell title="星座" :value="zodiacAstroRef.split('-')[1]">
            <template v-slot:icon>
                <van-icon class-prefix="my-love" name="xingzuo1"></van-icon>
            </template>
        </van-cell>
        <van-cell title="季节" :value="seasonRef">
            <template v-slot:icon>
                <van-icon class-prefix="my-love" name="dongtian"></van-icon>
            </template>
        </van-cell>
        <!-- @click="calendarShowRef = true" -->
        <van-cell title="生日" :value="birthDateRef" >
            <template v-slot:icon>
                <van-icon class-prefix="my-love" name="shengridangao"></van-icon>
            </template>
        </van-cell>

        <!-- 按钮 -->
        <div class="submit-btn">
            <van-button block round center plain hairline type="primary"
                @click="birthDayShowRef = true">
                选择小宝贝的生日
            </van-button>
        </div>
        <!-- 弹出层 -->
        <van-calendar v-model:show="calendarShowRef" title="日历" color="#1989fa"
            :show-confirm="false" :min-date="minDate" :max-date="maxDate"
            :default-date="new Date(pregnantDateRef.value)" :row-height="32" :show-mark="false" />
        <!-- 出生日选择 -->
        <van-popup v-model:show="birthDayShowRef" position="bottom">
            <van-datetime-picker :title="zodiacAstroRef" v-model="currentDateRef" type="date"
                @change="onBirthConfirm($event)" @confirm="onBirthConfirm($event,true)"
                @cancel="birthDayShowRef=false" :min-date="minDate" :max-date="maxDate" />
        </van-popup>
        <!-- 开始日选择 -->
        <van-popup v-model:show="pregnantDayShowRef" position="bottom">
            <van-datetime-picker title="请选择怀孕时间" v-model="currentDateRef" type="date"
                @change="onPregnantConfirm($event)" @confirm="onPregnantConfirm($event,true)"
                @cancel="pregnantDayShowRef=false" :min-date="minDate" :max-date="maxDate" />
        </van-popup>
    </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
import moment from 'moment';
import { getZodiac, getSeason } from './js/zodiac';
const getAstro = (value) => {
    let month = moment(value).month() + 1;
    let day = moment(value).date();
    var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
}
export default {
    setup() {
        /**变量定义 */
        const birthDateRef = ref(moment(new Date).add(365, "days").format('YYYY-MM-DD'));
        const birthDayShowRef = ref(false);
        const pregnantDayShowRef = ref(false);
        const calendarShowRef = ref(false);
        const fetationWekRef = ref(40);
        const pregnantDateRef = ref(moment(birthDateRef.value).add(fetationWekRef.value * -7, "days").format('YYYY-MM-DD'));
        const currentDateRef = ref(new Date());
        const zodiacAstroRef = ref(`${getZodiac(currentDateRef.value)} - ${getAstro(currentDateRef.value)}`); // 获取生肖
        const seasonRef = ref(getSeason(currentDateRef.value));

        /**计算属性 */
        const pregnantDayCmp = computed(() => {
            let allDay = fetationWekRef.value * 7;
            let monthDay = `约${parseInt(allDay / 30)}月${allDay % 30}天`
            return `(${allDay})` + monthDay;
        })
        watch(fetationWekRef, (newProp, oldProp) => {
            // 更改pregnantDateRef
            pregnantDateRef.value = moment(birthDateRef.value).add(newProp * -7, "days").format('YYYY-MM-DD');
        }, {
            immediate: true
        })
        /**方法定义 */
        const onBirthConfirm = (value, isClose) => {
            if (isClose) birthDayShowRef.value = false;
            birthDateRef.value = `${moment(value).format('YYYY-MM-DD')}`;
            pregnantDateRef.value = moment(birthDateRef.value).add(fetationWekRef.value * -7, "days").format('YYYY-MM-DD');
            zodiacAstroRef.value = `${getZodiac(value)} - ${getAstro(value)}`;
            seasonRef.value = getSeason(new Date(birthDateRef.value));
        };
        const onPregnantConfirm = (value, isClose) => {
            if (isClose) pregnantDayShowRef.value = false;
            // 计算当前时间
            pregnantDateRef.value = `${moment(value).format('YYYY-MM-DD')}`;
            birthDateRef.value = moment(pregnantDateRef.value).add(fetationWekRef.value * 7, "days").format('YYYY-MM-DD');
            zodiacAstroRef.value = `${getZodiac(new Date(birthDateRef.value))} - ${getAstro(new Date(birthDateRef.value))}`;
            seasonRef.value = getSeason(value);
        }

        /**暴露方法函数 */
        return {
            minDate: new Date(),
            maxDate: new Date(2024, 11, 31),
            seasonRef,
            calendarShowRef,
            zodiacAstroRef,
            pregnantDateRef,
            fetationWekRef,
            birthDateRef,
            birthDayShowRef,
            pregnantDayShowRef,
            currentDateRef,
            pregnantDayCmp,
            onBirthConfirm,
            onPregnantConfirm
        };
    },
};
</script>

<style lang="scss"  scoped>
#main-page {
    margin: 0 auto;
    max-width: 750px;
    // text-align: center;
    padding: 20px;
    .submit-btn {
        margin: 0 auto;
        margin-top: 150px;
    }
}
</style>
