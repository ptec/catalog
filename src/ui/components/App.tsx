import { useState } from "react";
import inventory from "../data/inventory.json";
import { X } from "lucide-react"
import clsx from "clsx";


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
      <div className="card bg-base-100 w-88 shadow-sm mx-auto">
        <figure
          onClick={() => item.image && !item.soldOut ? setOpen(true) : null}
          className="relative"
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.description}
              className={clsx(item.soldOut && "grayscale", "w-full h-52 cursor-pointer object-cover object-center transition-transform hover:scale-105")}
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
          { item.soldOut && <div className="absolute w-full h-full flex flex-col justify-center">
            <div className="w-full text-center text-2xl bg-accent text-accent-content font-alfa p-4">
              Sold Out
            </div>
          </div>
          }
        </figure>

        <div className="card-body">
          <h2 className="card-title flex flex-col items-center">
            <div className="badge badge-primary badge-outline text-nowrap">
              {item.category}
            </div>
            <span className="grow truncate">
              {item.name}
            </span>
          </h2>
          <p>{item.description}</p>
          <div className="card-actions justify-between items-center">
            {item.options && (
              <div className="dropdown w-full">
                <div tabIndex={ 0} role="button" className="btn w-full m-1">{item.options.length} Options</div>
                <ul  tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-full shadow-sm gap-1">
                  {item.options.map((option: any) => {
                    return (
                      <li className="max-w-full flex flex-row hover:bg-base-200 text-sm items-center flex-nowrap pl-2 rounded-lg">
                        <div className="badge badge-sm text-center w-8 font-bold items-center">${option.price}</div>
                        <div className="grow truncate! bg-transparent">{option.name}</div>
                        {option.soldOut && (
                          <button className="btn btn-primary btn-sm" disabled>
                            Sold Out
                          </button>
                        )}
                        {!option.soldOut && (
                          <a
                            className="btn btn-primary btn-sm"
                            href={option.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Buy Now
                          </a>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {!item.options && <>
              <p className="text-lg">${item.price}</p>
              {item.soldOut && (
                <button className="btn btn-primary" disabled>
                  Sold Out
                </button>
              )}
              {!item.soldOut && (
                <a
                  className="btn btn-primary"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Now
                </a>
              )}
            </>}
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
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 max-w-sm md:max-w-3xl 2xl:max-w-6xl mx-auto p-4">
      <div className="col-span-full flex flex-col gap-4 mx-auto justify-center">
        <h1 className="text-4xl md:text-5xl 2xl:text-6xl text-center p-4 font-alfa text-transparent bg-clip-text  bg-linear-to-tr from-primary to-accent">
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
          return (!(item.hide ?? false) && <Item key={i} i={i} item={item}/>)
        })
      }
      <div className="col-span-full h-48"></div>
    </div>
  )
}