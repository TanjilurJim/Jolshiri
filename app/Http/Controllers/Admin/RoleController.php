<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class RoleController extends Controller
{
    public function index(Request $request)


    {

        $roles= \Spatie\Permission\Models\Role::select('id', 'name')->paginate(10);
      
        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
        ]);
    }

    
    public function create()
    {
        return Inertia::render('admin/roles/create');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        Role::create(['name' => $validated['name']]);

        if (!empty($validated['permissions'])) {
        $role->syncPermissions($validated['permissions']); // if using spatie/laravel-permission
    }
        
        return redirect()->route('admin.roles.index')->with('success', 'Role created.');
        return redirect()->route('admin.roles.index')->with('success', 'Role created successfully.');
    }

    public function edit(Role $role)
    {
        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,'.$role->id,
        ]);

        $role->update($validated);

        return redirect()->route('admin.roles.index')->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()->route('admin.roles.index')->with('success', 'Role deleted successfully.');
    }
}