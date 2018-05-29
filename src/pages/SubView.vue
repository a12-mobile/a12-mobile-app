<template>
    <div style="width:80%">
        <label>{{selectedEvent}}</label>
        <vue-instant 
            :suggestion-attribute="suggestionAttribute" 
            v-model="value" 
            :disabled="false"  
            @input="changed"
            :show-autocomplete="true" 
            :autofocus="false" 
            :suggestions="suggestions" 
            name="customName" 
            placeholder="填写井名" 
            type="twitter">
        </vue-instant>
    </div>

</template>

<script>

    export default{
        data() {
            return {
                value: '',
                suggestionAttribute: 'original_title',
                suggestions:[],
                selectedEvent: ""
            }
        },
        created(){
            
            console.log(this.suggestions)

        },
        methods:{
             clickInput: function() {
                this.selectedEvent = 'click input'
            },
            clickButton: function() {
                this.selectedEvent = 'click button'
            },
            selected: function() {
                this.selectedEvent = 'selection changed'
            },
            enter: function() {
                this.selectedEvent = 'enter'
            },
            keyUp: function() {
                this.selectedEvent = 'keyup pressed'
            },
            keyDown: function() {
                this.selectedEvent = 'keyDown pressed'
            },
            keyRight: function() {
                this.selectedEvent = 'keyRight pressed'
            },
            clear: function() {
                this.selectedEvent = 'clear input'
            },
            escape: function() {
                this.selectedEvent = 'escape'
            },
            changed: function() {
                console.log(this.value)
                
            this.suggestions=[]
                this.suggestions.push({
		// "vote_count": 0,
		// "id": 395239,
		// "video": false,
		// "vote_average": 0,
		// "title": "ABCD of Health",
		// "popularity": 1.001177,
		// "poster_path": null,
		// "original_language": "en",
		"original_title": "ABCD of Health",
		// "genre_ids": [],
		// "backdrop_path": null,
		// "adult": false,
		// "overview": "Part of BFI boxset Ration Books and Rabbit Pies: Films from the Home Front.",
		// "release_date": "1942-01-01"
    })
    this.suggestions.push({
        'original_title':'abcd of abcd'
    })
            }
        },
        components: {
            // 'vue-instant': VueInstant.VueInstant
        }
    }
</script>