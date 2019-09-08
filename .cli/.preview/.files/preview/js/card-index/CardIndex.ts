/**
 * Interface for the component itself
 */
export interface CardIndex {

    /**
     * All available items
     */
    items: FilterableTile[];

    /**
     * List of available filters
     */
    categories: CategoryFilter[];

}

/**
 * Single category filter
 */
export interface CategoryFilter {
    /**
     * Visible label in the frontend
     * @faker commerce.productName
     */
    label: string;

    /**
     * Value for filtering. This value should be present on the single tile
     */
    value: string;

    /**
     * Defines if this entry is the reset for all filters. Like the 'All' button
     */
    isReset?: boolean;
}

/**
 * Single tile which extends the default expandable tile
 */
export interface FilterableTile {

    /**
     * All categories which this tile should be visible in. These values should match the `CategoryFilter.value` values
     */
    categories: string[];
}
