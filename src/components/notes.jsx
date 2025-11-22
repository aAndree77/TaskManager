import { useState, useEffect } from "react"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'

export default function Notes() {

    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem("notes")
        return saved ? JSON.parse(saved) : [];
    });

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState("scazuta");
    const [category, setCategory] = useState("👤 Personal");
    const [editId, setEditId] = useState(0)
    const [editTitle, setEditTitle] = useState("")
    const [editDesc, setEditDesc] = useState("")
    const [editCategory, setEditCategory] = useState("scazuta")
    const [editPriority, setEditPriority] = useState("👤 Personal")
    const [total, setTotal] = useState(0)
    const [active, setActive] = useState(0)
    const [finalizate, setFinalizate] = useState(0)
    const [prioritare, setPrioritare] = useState(0)
    const [filtru,setFiltru] = useState("toate")
    const [filtrate,setFiltrate] = useState([])
    const [search,setSearch] = useState("")



    useEffect(() => {
        setTotal(notes.length)
        setActive(notes.filter(n => !n.done).length)
        setFinalizate(notes.filter(n => n.done).length)
        setPrioritare(notes.filter(n => n.priority === "ridicata").length)
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function addTask() {
        if (!title) return
        setNotes(prev => [...prev, { title, text: desc, createdAt: new Date(), category, priority, id: Date.now(), done: false }])
        setTitle("")
        setDesc("")
        setPriority("scazuta")
        setCategory("👤 Personal")
    }

    function handleCheck(id) {
        setNotes(prev => prev.map(n => n.id === id ? { ...n, done: !n.done } : n))
    }

    function deleteNote(id) {
        setNotes(prev => prev.filter(n => n.id !== id))
    }

    function editNote(id) {
        const note = notes.find(n => n.id === id)
        setEditId(id)
        if (note) {
            setEditDesc(note.text)
            setEditTitle(note.title)
            setEditCategory(note.category)
            setEditPriority(note.priority)
        }
    }

    function saveTask() {
        setNotes(prev => prev.map(n => n.id === editId ? {
            ...n,
            title: editTitle,
            text: editDesc,
            category: editCategory,
            priority: editPriority,
            updatedAt: new Date()
        } : n))
        setEditId(0)
    }

    function cancelTask() {
        setEditId(0)
    }

    useEffect(()=>{
        if (filtru === "toate")
            setFiltrate(notes)
        if (filtru === "active") {
            setFiltrate(notes.filter(n=>n.done === false))
        }
        if (filtru === "done") {
            setFiltrate(notes.filter(n=>n.done === true))
        }
        if (filtru === "scazuta") {
            setFiltrate(notes.filter(n=>n.priority === "scazuta"))
        }
        if (filtru === "medie") {
            setFiltrate(notes.filter(n=>n.priority === "medie"))
        }
        if (filtru === "ridicata") {
            setFiltrate(notes.filter(n=>n.priority === "ridicata"))
        }
        if (search) setFiltrate(notes.filter(n=>n.title.includes(search)))
        
    },[filtru , notes ,search])

    return (
        <div className="p-4 flex items-center justify-center flex-col bg-[#020617] min-h-screen w-full">
            <div className="flex flex-col mt-3 gap-2 text-center">
                <h1 className="font-bold text-4xl md:text-5xl text-gray-100 drop-shadow-xl">✅Task Manager</h1>
                <p className="font-bold text-sm md:text-md text-gray-400">Organizează-ți sarcinile eficient!</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 w-full max-w-3xl px-2">
                <div className="bg-white rounded-lg flex justify-center items-center flex-col p-2 drop-shadow-xl">
                    <p className="font-bold">Total</p>
                    <p className="text-blue-400 text-xl font-bold">{total}</p>
                </div>
                <div className="bg-white rounded-lg flex justify-center items-center flex-col p-2 drop-shadow-xl">
                    <p className="font-bold">Active</p>
                    <p className="text-orange-500 text-xl font-bold">{active}</p>
                </div>
                <div className="bg-white rounded-lg flex justify-center items-center flex-col p-2 drop-shadow-xl">
                    <p className="font-bold">Finalizate</p>
                    <p className="text-green-500 text-xl font-bold">{finalizate}</p>
                </div>
                <div className="bg-white rounded-lg flex justify-center items-center flex-col p-2 drop-shadow-xl">
                    <p className="font-bold">Prioritare</p>
                    <p className="text-red-500 text-xl font-bold">{prioritare}</p>
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-xl h-auto w-full max-w-3xl gap-5 p-5 my-5">

                <h1 className="font-bold text-xl text-gray-700">➕Adaugă Sarcină Nouă</h1>

                <div className="flex flex-col gap-5">
                    {editId ? (
                        <>
                            <input className="w-full h-10 p-2 rounded-lg bg-white border border-gray-300 drop-shadow-md text-lg" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} type="text" placeholder="Titlul sarcinii..." />
                            <input className="w-full h-20 p-2 rounded-lg bg-white border border-gray-300 drop-shadow-md text-lg" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} type="text" placeholder="Descriere (opțional)..." />
                        </>
                    ) : (
                        <>
                            <input className="w-full h-10 p-2 rounded-lg bg-white border border-gray-300 drop-shadow-md text-lg" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Titlul sarcinii..." />
                            <input className="w-full h-20 p-2 rounded-lg bg-white border border-gray-300 drop-shadow-md text-lg" value={desc} onChange={(e) => setDesc(e.target.value)} type="text" placeholder="Descriere (opțional)..." />
                        </>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                        <div className="flex flex-col gap-3">
                            <h1 className="font-bold text-lg text-gray-700">Prioritate</h1>

                            <div className="grid grid-cols-3 w-full gap-2">
                                {!editId ? (
                                    <>
                                        <button onClick={() => setPriority("scazuta")} className={`bg-gray-200 py-2 rounded-lg text-sm text-gray-800 ${priority === "scazuta" && "bg-green-400 text-white font-bold"}`}>🟢 Scăzută</button>
                                        <button onClick={() => setPriority("medie")} className={`bg-gray-200 py-2 rounded-lg text-sm text-gray-800 ${priority === "medie" && "bg-yellow-400 text-white font-bold"}`}>🟡 Medie</button>
                                        <button onClick={() => setPriority("ridicata")} className={`bg-gray-200 py-2 rounded-lg text-sm text-gray-800 ${priority === "ridicata" && "bg-red-400 text-white font-bold"}`}>🔴 Ridicată</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setEditPriority("scazuta")} className={`bg-gray-200 py-2 rounded-lg text-sm text-gray-800 ${editPriority === "scazuta" && "bg-green-400 text-white font-bold"}`}>🟢 Scăzută</button>
                                        <button onClick={() => setEditPriority("medie")} className={`bg-gray-200 py-2 rounded-lg text-sm text-gray-800 ${editPriority === "medie" && "bg-yellow-400 text-white font-bold"}`}>🟡 Medie</button>
                                        <button onClick={() => setEditPriority("ridicata")} className={`bg-gray-200 py-2 rounded-lg text-sm text-gray-800 ${editPriority === "ridicata" && "bg-red-400 text-white font-bold"}`}>🔴 Ridicată</button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="font-bold text-lg text-gray-700">Categorie</h1>

                            {editId ? (
                                <select className="border border-gray-300 rounded-lg py-2" value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                                    <option value="👤 Personal">👤 Personal</option>
                                    <option value="💼 Muncă">💼 Muncă</option>
                                    <option value="🛒 Cumpărături">🛒 Cumpărături</option>
                                    <option value="❤️ Sănătate">❤️ Sănătate</option>
                                    <option value="📚 Învățare">📚 Învățare</option>
                                    <option value="📌 Altele">📌 Altele</option>
                                </select>
                            ) : (
                                <select className="border border-gray-300 rounded-lg py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="👤 Personal">👤 Personal</option>
                                    <option value="💼 Muncă">💼 Muncă</option>
                                    <option value="🛒 Cumpărături">🛒 Cumpărături</option>
                                    <option value="❤️ Sănătate">❤️ Sănătate</option>
                                    <option value="📚 Învățare">📚 Învățare</option>
                                    <option value="📌 Altele">📌 Altele</option>
                                </select>
                            )}
                        </div>

                    </div>
                    {editId ? (
                        <div className="w-full flex flex-col gap-2">
                            <button className={`w-full bg-gray-400 rounded-lg h-12 text-white text-lg drop-shadow-md hover:bg-gray-500 cursor-not-allowed ${editTitle && "bg-green-500 cursor-pointer hover:bg-green-600"}`} onClick={saveTask}>💾Salveaza</button>
                            <button className="w-full bg-red-400 rounded-lg h-12 text-white text-lg drop-shadow-md hover:bg-red-600 cursor-pointer" onClick={cancelTask}>❌Anuleaza</button>
                        </div>
                    ) : (
                        <button className={`w-full bg-gray-400 rounded-lg h-12 text-white text-lg drop-shadow-md hover:bg-gray-500 cursor-not-allowed ${title && "bg-green-500 cursor-pointer hover:bg-green-600"}`} onClick={addTask}>➕Adauga</button>
                    )}

                </div>
            </div>

            <div className="flex flex-col bg-white rounded-xl h-auto w-full max-w-3xl gap-5 p-5 my-5">
                <input value={search} onChange={(e)=>setSearch(e.target.value)}type="text" className="w-full h-10 p-2 rounded-lg bg-white border border-gray-300 drop-shadow-md text-lg" placeholder="🔎 Caută sarcini..."/>
                <div className="flex flex-row gap-2 justify-center flex-wrap">
                    <button onClick={()=>setFiltru("toate")} className={`rounded-lg bg-gray-200 px-5 py-2 font-bold text-gray-900 text-sm cursor-pointer transition duration-200 active:scale-80 ${filtru === "toate" && "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>Toate</button>
                    <button onClick={()=>setFiltru("active")} className={`rounded-lg bg-gray-200 px-5 py-2 font-bold text-gray-900 text-sm cursor-pointer transition duration-200 active:scale-80 ${filtru === "active" && "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>Active</button>
                    <button onClick={()=>setFiltru("done")} className={`rounded-lg bg-gray-200 px-5 py-2 font-bold text-gray-900 text-sm cursor-pointer transition duration-200  active:scale-80 ${filtru === "done" && "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>Done</button>
                    <button onClick={()=>setFiltru("scazuta")} className={`rounded-lg bg-gray-200 px-5 py-2 font-bold text-gray-900 text-sm cursor-pointer transition duration-200 active:scale-80 ${filtru  === "scazuta" && "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>Scazută</button>
                    <button onClick={()=>setFiltru("medie")} className={`rounded-lg bg-gray-200 px-5 py-2 font-bold text-gray-900 text-sm cursor-pointer transition duration-200 active:scale-80 ${filtru === "medie" && "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>Medie</button>
                    <button onClick={()=>setFiltru("ridicata")} className={`rounded-lg bg-gray-200 px-5 py-2 font-bold text-gray-900 text-sm cursor-pointer transition duration-200 active:scale-80 ${filtru === "ridicata" && "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>Ridicată</button>
                </div>

            </div>

            {filtrate.map(n => (
                <div key={n.id} className={`mb-3 w-full max-w-3xl flex items-center justify-between border border-gray-400 rounded-xl p-4 text-gray-800 font-bold drop-shadow-md ${n.done ? "bg-gray-200 opacity-70" : "bg-white"}`}>

                    <div className="flex justify-between w-full flex-col md:flex-row gap-3">

                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <div onClick={() => handleCheck(n.id)} className={`flex justify-center items-center border border-gray-400 w-5 h-5 cursor-pointer rounded-full ${n.done && "bg-white"}`}>
                                    {n.done && <CheckCircleSharpIcon className="text-green-500" />}
                                </div>

                                <h1 className={`text-gray-800 text-xl md:text-[1.7rem] ${n.done && "line-through"}`}>{n.title}</h1>

                                <h1 className={`text-white rounded-full py-1 px-2 ${n.priority === "scazuta" && "bg-green-500" || n.priority === "medie" && "bg-yellow-500" || n.priority === "ridicata" && "bg-red-500"}`}>
                                    {n.category}
                                </h1>

                                <p>
                                    {n.priority === "scazuta" && "🟢"}
                                    {n.priority === "medie" && "🟡"}
                                    {n.priority === "ridicata" && "🔴"}
                                </p>
                            </div>

                            <p className={`text-gray-500 text-[1rem] md:text-[1.2rem] ${n.done && "line-through"}`}>{n.text}</p>

                            <div className="flex flex-col mt-3 text-[0.75rem] text-gray-400">
                                <p>
                                    Creat: {new Date(n.createdAt).toLocaleString("ro-RO", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>

                                {n.updatedAt && (
                                    <p>
                                        Updatat: {new Date(n.updatedAt).toLocaleString("ro-RO", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-center">
                            <EditIcon onClick={() => editNote(n.id)} className="cursor-pointer bg-blue-500 text-white box-content py-2 px-1 rounded-md" />
                            <DeleteIcon onClick={() => deleteNote(n.id)} className="cursor-pointer bg-red-500 text-white box-content py-2 px-1 rounded-md hover:bg-red-600" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
