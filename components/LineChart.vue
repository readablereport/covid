<template>
    <div class="w-full mt-16">
        <no-ssr>
            <c-line :data="data"></c-line>
        </no-ssr>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                ],
                datasets: [
                    {
                        label: "My First dataset",
                        backgroundColor: "#FF0000",
                        borderColor: "#FF0000",
                        data: [2, 17, 25, 4, 57, 52, 19],
                        fill: false,
                    },
                ],
            },
        };
    },
};
</script>
