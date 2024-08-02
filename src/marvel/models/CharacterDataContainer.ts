import type { Character } from './Character';
export type CharacterDataContainer = {
  /**
   * The requested offset (number of skipped results) of the call.,
   */
  offset?: number;
  /**
   * The requested result limit.,
   */
  limit?: number;
  /**
   *  The total number of resources available given the current filter set.,
   */
  total?: number;
  /**
   *  The total number of results returned by this call.,
   */
  count?: number;
  /**
   *  The list of characters returned by the call.
   */
  results?: Character[];
};
