import type { CharacterDataContainer } from './CharacterDataContainer';

export type CharacterDataWrapper = {
  /**
   * The HTTP status code of the returned result
   */
  code?: number;
  /**
   *  A string description of the call status.
   */
  status?: string;
  /**
   * The copyright notice for the returned result
   */
  copyright?: string;
  /**
   * The attribution notice for this result. Please display either this notice or the contents of the attributionHTML field on all screens which contain data from the Marvel Comics API
   */
  attributionText?: string;
  /**
   * An HTML representation of the attribution notice for this result. Please display either this notice or the contents of the attributionText field on all screens which contain data from the Marvel Comics API
   */
  attributionHTML?: string;
  /**
   * The results returned by the call.,
   */
  data: CharacterDataContainer;
  /**
   * A digest value of the content returned by the call
   */
  etag?: string;
};
