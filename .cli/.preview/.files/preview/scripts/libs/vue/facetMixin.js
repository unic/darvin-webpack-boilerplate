export default function(baseElement) {
    return {
        props: {
            facets: {
                type: Array,
                default: () => [],
            }
        },

        computed: {
            rootClasses() {
                return this.facets.map((facet) => {
                    return `${baseElement}--${facet}`;
                });
            },
        },

        methods: {
            facetRoot(facet) {
                if(!facet) {
                    facet = 'base';
                }
                return [`${baseElement}--${facet}`];
            },

            facetElement(element, facet) {
                if(!facet) {
                    facet = 'base';
                }
                return [`${baseElement}__${element}--${facet}`];
            }
        }
    }
}
