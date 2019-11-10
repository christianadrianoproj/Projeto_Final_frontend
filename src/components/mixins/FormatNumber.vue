<template>
    <div>
    </div>
</template>

<script>
export default {
    methods: {
        formatNumber: function (number, precision = 2) {
            if (number == null)
                number = 0
            let val = number.toFixed(precision).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
}
</script>

<style>

</style>