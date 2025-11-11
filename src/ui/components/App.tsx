import { useState } from "react";
import inventory from "../data/inventory.json";
import { X } from "lucide-react"


type Item = typeof inventory[number];


function gradient(i: number) {
  switch (i % 5) {
    case 0: return "bg-linear-to-tr from-primary to-accent";
    case 1: return "bg-linear-to-tr from-secondary to-primary";
    case 2: return "bg-linear-to-tr from-accent to-secondary";
    case 3: return "bg-linear-to-tr from-primary to-secondary";
    case 4: return "bg-linear-to-tr from-secondary to-accent";
  }
}

function Item({ i, item }: { i: number; item: Item }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm mx-auto">
        <figure
          onClick={() => item.image ? setOpen(true) : null}
          className="cursor-pointer"
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.description}
              className="w-full h-52 object-cover object-center transition-transform hover:scale-105"
            />
          ) : (
            <div
              className={`flex flex-col items-center justify-center w-full h-52 ${gradient(
                i
              )}`}
            >
              <div
                className="text-center text-2xl"
                dangerouslySetInnerHTML={{ __html: item.noimage ?? "" }}
              ></div>
            </div>
          )}
        </figure>

        <div className="card-body">
          <h2 className="card-title">
            <div className="badge badge-primary badge-outline text-nowrap">
              {item.category}
            </div>
            <span className="grow truncate">
              {item.name}
            </span>
          </h2>
          <p>{item.description}</p>
          <div className="card-actions justify-between items-center">
            <p className="text-lg">${item.price}</p>
            <a
              className="btn btn-primary"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <dialog
          open
          className="modal modal-open"
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-box max-w-2xl bg-base-100 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex flex-row justify-between items-center p-2">
              <span className="text-lg italic">{item.name}</span>
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                <X/>
              </button>
            </div>
            <div className="w-full h-120 overflow-auto rounded-lg">
              <img
                src={item.image}
                alt={item.description}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}


export default function App() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-fit mx-auto">
      <div className="col-span-full flex flex-col gap-4 max-w-xl lg:max-w-2xl 2xl:max-w-4xl mx-auto justify-center">
        <h1 className="text-2xl lg:text-4xl 2xl:text-6xl text-center p-4 font-alfa text-transparent bg-clip-text  bg-linear-to-tr from-primary to-accent">
          PTEC<br/>Maker's Market Catalog
        </h1>
        <p className="text-lg mx-auto text-justify">
          Explore a curated selection of handcrafted items created by PTEC students and instructors for our annual Maker’s Market. Each piece reflects the skill, creativity, and dedication found in our programs—from woodworking and metalwork to digital design and fabrication. Every purchase directly supports our students as they prepare for SkillsUSA competitions and pursue excellence in their technical fields.
        </p>
        <p className="text-lg mx-auto italic text-justify">
          Purchases may be made online through Square or in person with cash. Items purchased online can be redeemed at location. Please note that shipping and delivery are not available. For additional information, contact Donna Greene at&nbsp;
          <a className="text-primary" href="mailto:donna.greene@jamesirwin.org">donna.greene@jamesirwin.org</a>.
        </p>

      </div>
      {
        inventory.map((item, i) => {
          return <Item key={i} i={i} item={item}/>
        })
      }
    </div>
  )
}