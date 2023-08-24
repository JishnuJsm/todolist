import "./loader.css";
export default function Loader() {
  return (
    <>
      <div className="loaderDiv">
        <svg class="loader" viewBox="0 0 100 100">
          <g class="points">
            <circle class="ciw" cx="50" cy="50" r="50" fill="wheat" />
            <circle class="ci2" cx="5" cy="50" r="4" />
            <circle class="ci1" cx="95" cy="50" r="4" />
          </g>
        </svg>
      </div>
    </>
  );
}
