<template>
    <input
        class="appearance-none bg-transparent border-none w-full h-16 text-5xl font-light text-gray-600 mr-3 py-1 px-4 focus:outline-none"
        type="search"
        placeholder="your location"
        :value="value"
        @input="updateValue($event.target.value)"
    />
</template>
<script>
import L from "leaflet";
import * as places from "places.js";
export default {
    props: {
        value: {
            type: String,
            default: "",
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            placesAutocomplete: null,
        };
    },

    watch: {
        options: {
            deep: true,
            handler(newOptions) {
                this.placesAutocomplete.configure(newOptions);
            },
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.options.container = this.options.container || this.$el;

            this.placesAutocomplete = places({
                ...this.options,
                type: "city",
                countries: ["US"],
                aroundLatLngViaIP: false,
                container: this.options.container,
                templates: {
                    value: (suggestion) => {
                        //Bug in places
                        if (suggestion.name === "New York") {
                            suggestion.administrative = "New York";
                        }

                        return `${suggestion.name}, ${suggestion.administrative}`;
                    },
                },
            });

            this.placesAutocomplete.on("suggestions", this.onSuggestions);
            this.placesAutocomplete.on("cursorchanged", this.onCursorChanged);
            this.placesAutocomplete.on("change", this.onChange);
            this.placesAutocomplete.on("clear", this.onClear);
            this.placesAutocomplete.on("limit", this.onError);
            this.placesAutocomplete.on("error", this.onError);
        });
    },

    methods: {
        updateValue(value) {
            console.log("places value changed");
            this.$emit("input", value);
        },

        onSuggestions(e) {
            console.log("places onSuggestions");
            this.$emit("onSuggestions", e);
        },

        onCursorChanged(e) {
            console.log("places onCursorChanged");
            this.$emit("onCursorChanged", e);
        },

        onChange(e) {
            console.log("places onChange");
            this.$emit("onChange", e);
            let { name, administrative } = e.suggestion;

            this.updateValue(`${name}, ${administrative}`);
        },

        onClear(e) {
            console.log("places onClear");
            this.$emit("onClear");
            this.updateValue(null);
        },

        onError(e) {
            console.log("places onError");
            this.$emit("onError", e.message);
        },
    },

    beforeDestroy() {
        if (this.placesAutocomplete) {
            this.placesAutocomplete.destroy();
        }
    },
};
</script>
<style>
.ap-suggestion-icon svg {
    display: inline;
}

.ap-footer svg {
    display: inline;
}
</style>
