'use-strict';

angular
  .module('billFormIsPaidData')
  .factory('BillFormIsPaidData', function() {
    return null;
    function generateIsPaidInputValueObj() {
      return {
        _raw: null,
        rounded: null,
        display: null,
        set raw(value) {
          this._raw = value;
          if (!value && value !== 0) {
            this.rounded = null;
            this.display = null;
          }
          else if (value < 0) {
            this.rounded = null;
            this.display = 'negative';
          }
          else {
            this.display = value.toFixed(2);
            this.rounded = parseFloat(this.display);
          }
        },
        get raw() {
          return this._raw;
        },
        get self() {
          return {
            raw: this._raw,
            display: this.display
          };
        }
      };
    }
  });