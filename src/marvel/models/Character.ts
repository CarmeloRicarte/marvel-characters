import type { Image } from './Image';
import type { Url } from './Url';

export type Character = {
  /**
   * The unique ID of the character resource
   */
  id?: number;
  /**
   * The name of the character
   */
  name?: string;
  /**
   * A short bio or description of the character
   */
  description?: string;
  /**
   * The date the resource was most recently modified as string
   */
  modified?: string;
  /**
   * The canonical URL identifier for this resource
   */
  resourceURI?: string;
  /**
   * A set of public web site URLs for the resource
   */
  urls?: Url[];
  /**
   * The representative image for this character
   */
  thumbnail?: Image;
};
