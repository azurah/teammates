import { Injectable } from '@angular/core';
import { SortBy, SortOrder } from '../types/sort-properties';

/**
 * Handles comparison logic between sortable table elements
 */
@Injectable({
  providedIn: 'root',
})
export class TableComparatorService {

  constructor() { }

  /**
   * Compares two strings lexicographically depending on order given.
   */
  compareLexicographically(strA: string, strB: string, order: SortOrder): number {
    if (order === SortOrder.ASC) {
      return strA.localeCompare(strB);
    }
    if (order === SortOrder.DESC) {
      return strB.localeCompare(strA);
    }
    return 0;
  }

  /**
   * Compares two strings naturally depending on the order given.
   */
  compareNaturally(strA: string, strB: string, order: SortOrder): number {
    if (order === SortOrder.ASC) {
      return strA.localeCompare(strB, undefined, { numeric: true });
    }
    if (order === SortOrder.DESC) {
      return strB.localeCompare(strA, undefined, { numeric: true });
    }
    return 0;
  }

  /**
   * Compares two strings depending on element to sort by and the order given.
   */
  compare(sortBy: SortBy, order: SortOrder, strA: string, strB: string): number {
    switch (sortBy) {
      case SortBy.RUBRIC_CHOICE:
      case SortBy.RANK_RECIPIENTS_TEAM:
      case SortBy.RANK_RECIPIENTS_RECIPIENT:
      case SortBy.RANK_OPTIONS_OVERALL_RANK:
      case SortBy.NUMERICAL_SCALE_AVERAGE:
      case SortBy.NUMERICAL_SCALE_MAX:
      case SortBy.NUMERICAL_SCALE_MIN:
      case SortBy.NUMERICAL_SCALE_AVERAGE_EXCLUDE_SELF:
      case SortBy.MCQ_WEIGHT:
      case SortBy.MCQ_RESPONSE_COUNT:
      case SortBy.MCQ_PERCENTAGE:
      case SortBy.MCQ_WEIGHTED_PERCENTAGE:
      case SortBy.SECTION_NAME:
      case SortBy.TEAM_NAME:
      case SortBy.SESSION_NAME:
        return this.compareNaturally(strA, strB, order);
      case SortBy.RANK_RECIPIENTS_SELF_RANK:
      case SortBy.RANK_RECIPIENTS_OVERALL_RANK:
      case SortBy.RANK_RECIPIENTS_OVERALL_RANK_EXCLUDING_SELF:
      case SortBy.RANK_OPTIONS_OPTION:
      case SortBy.MCQ_CHOICE:
      case SortBy.STUDENT_NAME:
      case SortBy.EMAIL:
      case SortBy.STUDENT_GENDER:
      case SortBy.INSTITUTION:
      case SortBy.NATIONALITY:
      case SortBy.JOIN_STATUS:
      case SortBy.COURSE_ID:
      case SortBy.COURSE_NAME:
      case SortBy.COURSE_CREATION_DATE:
      case SortBy.SESSION_COMPLETION_STATUS:
      case SortBy.SESSION_START_DATE:
      case SortBy.SESSION_END_DATE:
      case SortBy.SESSION_CREATION_DATE:
      case SortBy.SESSION_DELETION_DATE:
      case SortBy.QUESTION_TYPE:
      case SortBy.QUESTION_TEXT:
      case SortBy.GIVER_TEAM:
      case SortBy.GIVER_NAME:
      case SortBy.RECIPIENT_TEAM:
      case SortBy.RECIPIENT_NAME:
        return this.compareLexicographically(strA, strB, order);
      default:
        return 0;
    }
  }
}
