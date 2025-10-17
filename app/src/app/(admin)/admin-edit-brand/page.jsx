"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react'

function page() {
	// Local state to manage list and inline edit/add
	const [brands, setBrands] = useState([
		{ name: "Acme" },
		{ name: "Globex" },
		{ name: "Initech" },
		{ name: "Umbrella" },
	])
	const [nameInput, setNameInput] = useState("")
	const [editingIndex, setEditingIndex] = useState(null)
	const inputRef = useRef(null)

	useEffect(() => {
		if (editingIndex !== null && inputRef.current) {
			inputRef.current.focus()
		}
	}, [editingIndex])

	const handleCancel = () => {
		setNameInput("")
		setEditingIndex(null)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!nameInput.trim()) return
		if (editingIndex === null) {
			setBrands(prev => [...prev, { name: nameInput.trim() }])
		} else {
			setBrands(prev => prev.map((b, i) => (i === editingIndex ? { name: nameInput.trim() } : b)))
		}
		handleCancel()
	}

	const handleEdit = (index) => {
		setEditingIndex(index)
		setNameInput(brands[index].name)
	}

	const handleDelete = (index) => {
		setBrands(prev => prev.filter((_, i) => i !== index))
		if (editingIndex === index) {
			handleCancel()
		}
	}

	const handleInlineEdit = (index, value) => {
		setEditingIndex(index)
		setNameInput(value)
	}

	return (
		<div className='min-h-screen w-full pb-0 overflow-y-hidden -mt-2.5 md:mt-0 bg-primary'>
			<div className='max-w-5xl mx-auto px-4 py-8 md:py-12'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-base-content mb-2'>Brand Management</h1>
					<p className='text-base-content/70'>Manage your brand portfolio with ease</p>
				</div>

				<div className='bg-white rounded-xl shadow-sm border border-base-300 overflow-hidden'>
					<div className='p-6 md:p-8 border-b border-base-300 bg-secondary/30'>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='flex flex-col sm:flex-row gap-3'>
								<div className='flex-1'>
									<input
										ref={inputRef}
										type="text"
										value={nameInput}
										onChange={(e) => setNameInput(e.target.value)}
										placeholder={editingIndex === null ? 'Enter brand name...' : 'Update brand name...'}
										className='input input-bordered w-full'
										required
									/>
								</div>
								<div className='flex gap-2'>
									{(nameInput || editingIndex !== null) && (
										<button
											type="button"
											className='btn btn-outline flex items-center gap-2'
											onClick={handleCancel}
										>
											<X size={18} />
											<span className='hidden sm:inline'>Cancel</span>
										</button>
									)}
									<button
										type="submit"
										className='btn text-white btn-success flex items-center gap-2'
									>
										{editingIndex === null ? <Plus size={18} /> : <Check size={18} />}
										<span>{editingIndex === null ? 'Add Brand' : 'Save'}</span>
									</button>
								</div>
							</div>
						</form>
					</div>

					<div className='p-6 md:p-8'>
						{brands.length === 0 ? (
							<div className='text-center py-12 text-base-content/60'>
								<p className='text-lg'>No brands yet. Add your first brand above!</p>
							</div>
						) : (
							<div className='space-y-2'>
								{brands.map((brand, idx) => (
									<div
										key={idx}
										className={`flex items-center justify-between p-4 rounded-lg border transition-all group ${
											editingIndex === idx
												? 'border-success/60 bg-success/10'
												: 'border-base-300 hover:border-base-300 hover:bg-accent '
										}`}
									>
										<div
											className='flex-1 font-medium  cursor-pointer group-hover:text-white'
											onClick={() => handleInlineEdit(idx, brand.name)}
										>
											{brand.name}
										</div>
										<div className='flex gap-2'>
											<button
												type='button'
												className='btn btn-ghost btn-sm text-white btn-success '
												onClick={() => handleEdit(idx)}
												title="Edit brand"
											>
												<Pencil size={18} />
											</button>
											<button
												type='button'
												className='btn btn-ghost btn-sm text-base-content hover:text-white btn-error'
												onClick={() => handleDelete(idx)}
												title="Delete brand"
											>
												<Trash2 size={18} />
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className='mt-6 text-center text-sm text-base-content/70'>
					{brands.length} {brands.length === 1 ? 'brand' : 'brands'} in total
				</div>
			</div>
		</div>
	)
}

export default page


