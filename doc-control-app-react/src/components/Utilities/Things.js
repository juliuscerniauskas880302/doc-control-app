import React from "react";

const Things = () => {
  return (
    <li
      class="filepond--item"
      id="filepond--item-vbll1ao3f"
      style={{
        transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        opacity: "1",
        height: "42px"
      }}
      data-filepond-item-state="idle"
    >
      <fieldset class="filepond--file-wrapper">
        <legend>what_is_science.pdf</legend>
        <input type="hidden" name="selectedAdditionalFiles" value="" />
        <div class="filepond--file">
          <button
            class="filepond--file-action-button filepond--action-abort-item-load"
            type="button"
            title="Abort"
            data-align="right"
            disabled="disabled"
            style={{
              transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
              opacity: "0"
            }}
          />
          <button
            class="filepond--file-action-button filepond--action-retry-item-load"
            type="button"
            title="Retry"
            data-align="right"
            disabled="disabled"
            style={{
              transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
              opacity: "0"
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z"
                fill="currentColor"
                fill-rule="nonzero"
              />
            </svg>
          </button>
          <button
            class="filepond--file-action-button filepond--action-remove-item"
            type="button"
            title="Pašalinti"
            data-align="left"
            style={{
              transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
              opacity: "1"
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z"
                fill="currentColor"
                fill-rule="nonzero"
              />
            </svg>
          </button>
          <div
            class="filepond--file-info"
            style={{ transform: "translate3d(33px, 0px, 0)" }}
          >
            <span class="filepond--file-info-main" aria-hidden="true">
              what_is_science.pdf
            </span>
            <span class="filepond--file-info-sub">899 KB</span>
          </div>
          <div
            class="filepond--file-status"
            style={{
              transform: "translate3d(33px, 0px, 0)",
              opacity: "0",
              visibility: "hidden",
              pointerEvents: "none"
            }}
          >
            <span class="filepond--file-status-main" />
            <span class="filepond--file-status-sub" />
          </div>
          <div
            class="filepond--processing-complete-indicator"
            data-align="right"
            // style={{transform:'scale3d(0.75, 0.75, 1)', opacity:'0;visibility:hidden;pointer-events:none;"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z"
                fill="currentColor"
                fill-rule="nonzero"
              />
            </svg>
          </div>
          <div
            class="filepond--progress-indicator filepond--load-indicator"
            // style="opacity:0;visibility:hidden;pointer-events:none;"
          >
            <svg>
              <path stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <div
            class="filepond--progress-indicator filepond--process-indicator"
            // style="opacity:0;visibility:hidden;pointer-events:none;"
          >
            <svg>
              <path stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
        </div>
      </fieldset>
      <div class="filepond--panel filepond--item-panel" data-scalable="true">
        <div class="filepond--panel-top filepond--item-panel" />
        <div
          class="filepond--panel-center filepond--item-panel"
          style={{
            transform: "translate3d(0px, 8px, 0) scale3d(1, 0.26, 1)"
          }}
        />
        <div
          class="filepond--panel-bottom filepond--item-panel"
          style={{ transform: "translate3d(0px, 34px, 0)" }}
        />
      </div>
    </li>
  );
};
export default Things;
